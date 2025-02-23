<!-- components/DataUploader.vue -->
<template>
  <el-form>
    <el-form-item label="上传训练数据">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-success="handleSuccess"
        :on-error="handleError"
      >
        <el-button type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="手动输入数据">
      <el-input v-model="manualData" placeholder="请输入数据" />
    </el-form-item>
    <el-button @click="submitData">提交数据</el-button>
  </el-form>
  <el-alert v-if="alertMessage" :type="alertType" :closable="false"> [[ alertMessage ]] </el-alert>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as tf from '@tensorflow/tfjs'
import { useModelStore } from '../stores/models'

const manualData = ref('')
const alertMessage = ref('')
const alertType = ref('success')
const modelStore = useModelStore()

const handleSuccess = (response) => {
  // 处理上传成功的数据
  modelStore.trainingData = response.data
  alertMessage.value = '数据上传成功'
  alertType.value = 'success'
}

const handleError = (error) => {
  // 处理上传错误
  console.error('上传失败:', error)
  alertMessage.value = '数据上传失败'
  alertType.value = 'error'
}

const preprocessData = (data) => {
  // 假设数据是CSV格式的字符串
  const rows = data.split('\n')
  const processedData = rows.map((row) => row.split(',').map(Number))
  return tf.tensor2d(processedData)
}

const submitData = () => {
  if (!manualData.value) {
    alertMessage.value = '请输入数据'
    alertType.value = 'error'
    return
  }

  try {
    const processedData = preprocessData(manualData.value)
    modelStore.setTrainingData(processedData)
    alertMessage.value = '数据提交成功'
    alertType.value = 'success'
  } catch (error) {
    console.error('数据处理失败:', error)
    alertMessage.value = '数据处理失败，请检查数据格式'
    alertType.value = 'error'
  }
}
</script>
