<template>
  <div class="app-container">
    <!-- 标签 -->
    <div class="operate-container">
      <el-card shadow="never">
        <i class="el-icon-tickets"></i> 新闻列表
        <el-button class="btn-add" type="success" size="small" @click="showAddDialog()">添加</el-button>
      </el-card>
    </div>

    <!-- 新闻列表 -->
    <div class="table-container">
      <el-table :data="showData" border style="width: 100%">
        <!-- <el-table-column prop="coverImg" label="图片" width="200">
          <template slot-scope="scope">
            <el-image style="width: 80px; height: 80px" :src="scope.row.coverImg"></el-image>
          </template>
        </el-table-column> -->
        <el-table-column prop="title" label="标题" width="200"></el-table-column>
        <el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
        <el-table-column prop="publishDate" label="发布时间" width="200"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="showEditDialog(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleNewsRemove(scope.row.newsId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 数据分页 -->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next"
        :current-page="pageNo"
        :page-size="pageSize"
        :total="total"
        @current-change="pageNoChange">
      </el-pagination>
    </div>

    <!-- 添加（编辑）新闻dialog -->
    <el-dialog :title="dialogTitle" :visible.sync="formDialogVisible" width="700px" :before-close="handleCancel">
      <el-form :model="form" label-position="left" label-width="50px" ref="form">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <el-input type="textarea" :rows="6" v-model="form.content"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload action="#"
            list-type="picture-card"
            accept=".jpg,.png"
            :before-upload="beforeFileUpload"
            :http-request="handleFileUpload"
            ref="upload">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handleImagePreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span class="el-upload-list__item-delete" @click="handleFileRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="handleSubmit()">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 图片预览dialog -->
    <el-dialog :visible.sync="imageDialogVisible" width="30%">
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/admin/news'

export default {
  inject: ['reload'],
  data() {
    return {
      // 表单dialog (添加和编辑共用)---------------------------------------
      formDialogVisible: false,
      dialogTitle: '',
      form: {
        title: '',
        content: '',
        filenameList: []           // 字符串拼接: 'uid'+'originalFilename'
      },
      row: {},                     // 选中的el-table行对象
      // 图片dialog-------------------------------------------------------
      imageDialogVisible: false,
      imageUrl: '',
      // 新闻列表 (表格分页)------------------------------------------------
      tableData: [],
      showData: [],
      pageNo: 1,
      pageSize: 3,
      total: 0
    }
  },

  created() {
    const pageSize = this.pageSize
    const params = { pageSize }
    api.getNews(params).then(res => {
      const { data } = res
      this.total = data.total
      this.tableData = data.tableData
      this.showData = this.tableData[0]
    })
  },

  methods: {
    /**
     * @method 弹出添加dialog
     */
    showAddDialog() {
      this.dialogTitle = '添加新闻'
      this.formDialogVisible = true
    },

    /**
     * @method 弹出编辑dialog
     * @param row el-table行对象
     */
    showEditDialog(row) {
      console.log(row);
      this.row = row
      console.log(this.row);
      this.dialogTitle = '编辑新闻'
      this.form.title = row.title
      this.form.content = row.content
      this.formDialogVisible = true
    },

    /**
     * @method 上传文件前的处理
     * @description 判断文件格式是否合法
     * @param file 待上传的文件对象
     */
    beforeFileUpload(file) {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isImage) {
        this.$message.error('上传文件只能是 jpg、png格式!')
      }
      return isImage
    },

    /**
     * @method 上传文件
     * @param item 待上传的文件对象
     */
    handleFileUpload(item) {
      const file = item.file
      console.log(file)
      const filename = file.uid + '_' + file.name
      let formData = new FormData()
      formData.append("file", file)
      formData.append("filename", filename)
      api.uploadImage(formData).then(res => {
        const { data } = res
        console.log(data)
        this.form.filenameList.push(data.filename)
        console.log(this.form.filenameList)
      })
    },

    /**
     * @method 图片预览
     * @param file 待预览的文件对象
     */
    handleImagePreview(file) {
      this.imageUrl = file.url
      this.imageDialogVisible = true
    },

    /**
     * @method 删除文件（图片）
     * @param file 待删除的文件对象
     */
    handleFileRemove(file) {
      const filename = file.uid + '_' + file.name
      const params = { filename }
      api.delImage(params).then(res => {
        const { data } = res
        console.log(data)
        let filenameList = this.form.filenameList
        filenameList.splice(filenameList.indexOf(data.filename),1)
        console.log(filenameList)
        this.form.filenameList = filenameList
        this.$refs.upload.handleRemove(file)
      })
    },

    /**
     * @method 取消或者关闭dialog
     * @description 将文件名列表（filenameList）传给后端
     */
    handleCancel() {
      this.formDialogVisible = false
      const filenameList = this.form.filenameList
      const data = { filenameList }
      api.delImages(data).then(res => {
        const { data } = res
        console.log(data)
        this.row = {}
        this.form.title = ''
        this.form.content = ''
        this.form.filenameList = []
        this.$refs.upload.clearFiles()
      })
    },

    /**
     * @method 提交
     * @description 根据dialogTitle来判断将添加新闻和编辑新闻整合
     */
    handleSubmit() {
      const { title, content, filenameList } = this.form
      const newsId = this.row.newsId
      if (this.dialogTitle === '添加新闻') {
        const data = { title, content, filenameList }
        api.addNews(data).then(res => {
          const { data } = res
          this.reload()
          this.$message.success('添加成功')
        })

      } else if (this.dialogTitle === '编辑新闻') {
        const data = { newsId, title, content, filenameList }
        console.log(data)
        api.updateNews(data).then(res => {
          const { data } = res
          this.reload()
          this.$message.success('更改成功')
        })

      } else {
        console.error('error')
      }
    },

    /**
     * @method 删除新闻
     * @param newsId
     */
    handleNewsRemove(newsId) {
      console.log(newsId)
      this.$confirm('此操作将删除该新闻, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = { newsId }
        api.delNews(params).then(res => {
          const { data } = res
          this.reload()
          this.$message.success('删除成功')
        })
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },

    /**
     * @method 页码改变
     */
    pageNoChange(pageNo) {
      this.pageNo = pageNo
      this.showData = this.tableData[pageNo - 1]
    }

  }
}
</script>

<style lang="scss" scoped>
.operate-container .btn-add {
  float: right;
}

.table-container {
  margin-top: 20px;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.single-row {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
</style>
