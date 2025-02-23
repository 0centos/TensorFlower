<template>
  <el-form :model="modelConfig" label-width="120px">
    <el-form-item label="损失函数">
      <el-select v-model="modelConfig.lossFunction">
        <el-option label="均方误差" value="meanSquaredError"></el-option>
        <el-option label="交叉熵" value="categoricalCrossentropy"></el-option>
        <el-option label="自定义" value="custom"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="层数">
      <el-input-number v-model="modelConfig.numLayers" :min="1" :max="10"></el-input-number>
    </el-form-item>
    <el-form-item label="计算单元">
      <el-input-number v-model="modelConfig.units" :min="1" :max="100"></el-input-number>
    </el-form-item>
    <el-form-item label="输入维度">
      <el-input-number v-model="modelConfig.inputShape" :min="1" :max="100"></el-input-number>
    </el-form-item>
    <el-form-item label="激活函数">
      <el-select v-model="modelConfig.activationFunction">
        <el-option label="ReLU" value="relu"></el-option>
        <el-option label="Sigmoid" value="sigmoid"></el-option>
        <el-option label="Tanh" value="tanh"></el-option>
        <el-option label="Softmax" value="softmax"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="applyConfig">应用配置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModelStore } from '../stores/models'

const modelStore = useModelStore()

const modelConfig = ref({
  lossFunction: 'meanSquaredError',
  numLayers: 1,
  units: 1,
  inputShape: 1,
  activationFunction: 'relu',
})

const applyConfig = () => {
  modelStore.setModelConfig(modelConfig.value)
}
</script>
