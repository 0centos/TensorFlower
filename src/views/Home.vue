<!-- views/Home.vue -->
<template>
  <div>
    <ModelConfig />
    <DataUploader />
    <ModelTraining />
  </div>
</template>

<script setup>
import ModelConfig from '../components/ModelConfig.vue'
import DataUploader from '../components/DataUploader.vue'
import ModelTraining from '../components/ModelTraining.vue'
</script>
