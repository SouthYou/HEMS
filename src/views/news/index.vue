<template>
  <div class="app-container">
    <!-- 标签 -->
    <div class="operate-container">
      <el-card shadow="never">
        <i class="el-icon-tickets"></i> 新闻列表
        <el-button class="btn-add" type="success" size="small" @click="addDialogVisible = true">添加</el-button>
      </el-card>
    </div>

    <!-- 新闻列表 -->
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="img" label="图片" width="300">
          <template slot-scope="scope">
            <el-image style="width: 80px; height: 80px" :src="scope.row.img" :fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="publish_date" label="发布时间" width="200"></el-table-column>
        <el-table-column label="操作" width="150">
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加新闻dialog -->
    <el-dialog title="添加新闻" :visible.sync="addDialogVisible" width="700px">
      <el-form :model="addForm" label-position="left" label-width="50px" ref="addForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <el-input type="textarea" :rows="6" v-model="addForm.content"></el-input>
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
                <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
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
  data() {
    return {
      // 图片dialog
      imageDialogVisible: false,
      imageUrl: '',
      // 添加新闻dialog
      addDialogVisible: false,
      addForm: {
        title: '',
        content: '',
        filenameList: []     //字符串拼接: uid'+'originalFilename'
      },
      // 新闻列表
      tableData: []
    }
  },

  created() {
    // api.getNews().then(response => {
    //   const { data } = response
    //   this.tableData = data
    // })
  },

  methods: {
    beforeFileUpload(file) {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isImage) {
        this.$message.error('上传文件只能是 jpg、png格式!')
      }
      return isImage
    },

    handleFileUpload(item) {
      const file = item.file
      const filename = file.uid + '_' + file.name
      let formData = new FormData()
      formData.append("file", file)
      formData.append("filename", filename)
      api.uploadImage(formData).then(res => {
        const { data } = res
        console.log(data)
        this.addForm.filenameList.push(data.filename)
        console.log(this.addForm.filenameList)
      })
    },

    handleImagePreview(file) {
      this.imageUrl = file.url
      this.imageDialogVisible = true
    },

    handleRemove(file) {
      const filename = file.uid + '_' + file.name
      const data = { filename }
      api.delImage(data).then(res => {
        const { data } = res
        console.log(data)
      })
      // TODO 将删除操作安排至请求后
      let filenameList = this.addForm.filenameList
      filenameList.splice(filenameList.indexOf(filename),1)
      console.log(filenameList)
      this.addForm.filenameList = filenameList
      this.$refs.upload.handleRemove(file)
    },

    handleSubmit() {
      const { title, content, filenameList } = this.addForm
      const data = { title, content, filenameList }
      api.addNews(data).then(res => {
        const { data } = res
        console.log(data)
      })
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
</style>
