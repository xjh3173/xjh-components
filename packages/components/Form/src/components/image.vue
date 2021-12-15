<template>
  <div class="json-image">
    <el-upload
      ref="upload"
      list-type="picture-card"
      :action="'http://113.108.141.68:11522/shncgl/rest/shncgl' + '/uploadFile'"
      :name="fileKey"
      :data="params"
      :limit="9"
      :class="{ readonly: data.readonly }"
      :file-list="model || []"
      :on-success="onSuccess"
      :on-error="onError"
      :on-change="onChange"
      :on-preview="handlePictureCardPreview"
      :auto-upload="false"
      :disabled="data.readonly"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <el-dialog class="image-dialog" :visible.sync="dialogVisible" append-to-body top="20px">
      <span slot="title">图片</span>

      <el-carousel v-if="data.readonly" ref="carousel" indicator-position="outside" height="80vh" :autoplay="false" :initial-index="index">
        <el-carousel-item v-for="(item, i) in model" :key="i">
          <img :src="item.large" class="img-item">
        </el-carousel-item>
      </el-carousel>
      <img v-else class="img-item" :src="imgUrl" alt="">
    </el-dialog>

    <span v-if="data.readonly && value && !value.length">无</span>

  </div>
</template>

<script>
export default {
  name: 'JsonImage',
  props: {
    value: {
      type: Array,
      default: null
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      model: this.value,
      dialogVisible: false,
      imgUrl: '',
      index: 0,
      params: {
        action: 'ADD_BS_LINE_PATROL_EVENT_HANDLEPICTURE'
      },
      fileKey: 'file',
      loadedNum: 0
    }
  },
  watch: {
    value(val) {
      this.model = this.value
      this.preView()
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      if (this.data.readonly) {
        this.index = file.index
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.carousel.setActiveItem(file.index)
        })
      } else {
        this.dialogVisible = true
        this.imgUrl = file.url
      }
    },
    submitUpload(params) {
      this.loadedNum = 0
      this.params.content = JSON.stringify(params)
      this.$refs.upload.submit()
    },
    onSuccess(e, file, fileList) {
      this.loadedNum++
      if (this.loadedNum === fileList.length) {
        this.$emit('uploadCallback', true)
      }
    },
    onError(e) {
      this.$emit('uploadCallback', false)
    },
    onChange(file, fileList) {
      const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      if (!isJPG || !isLt2M) {
        fileList.splice(fileList.length - 1, 1)
      } else {
        this.$emit('input', fileList)
      }
    },
    preView() {
      this.value.forEach(item => {
        const image = new Image()
        image.src = item.large
      })
    }
  }
}
</script>

<style lang="scss">
.json-image {
  .readonly {
    .el-upload-list__item-status-label {
      display: none!important;
    }

    .el-upload {
      display: none;
    }
  }
}

.image-dialog {
  .el-dialog__body {
    max-height: initial;
  }

  .img-item {
    display: block;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
  }

  // .el-upload-list__item {
  //   transition: none;
  // }
}
</style>
