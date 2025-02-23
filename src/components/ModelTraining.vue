<!-- components/ModelTraining.vue -->
<template>
  <div>
    <el-button @click="trainModel">开始训练</el-button>
    <div id="lossChart"></div>
  </div>
</template>

<script setup lang="ts">
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import { onMounted } from 'vue'
import { useModelStore } from '../stores/models'

const modelStore = useModelStore()

const model = tf.sequential()

onMounted(() => {
  const layers = []
  for (let i = 0; i < modelStore.numLayers; i++) {
    layers.push(
      tf.layers.dense({
        units: modelStore.units,
        inputShape: [modelStore.inputShape],
        activation: modelStore.activationFunction,
      }),
    )
  }
  model.add(layers)
  model.compile({
    optimizer: 'sgd',
    loss: modelStore.lossFunction,
  })
})

const trainModel = async () => {
  const xs = tf.tensor2d([1, 2, 3, 4], [4, 1])
  const ys = tf.tensor2d([1, 3, 5, 7], [4, 1])

  const history = await model.fit(xs, ys, {
    epochs: 100,
    callbacks: tfvis.show.fitCallbacks({ name: '损失曲线' }, ['loss'], {
      callbacks: ['onEpochEnd'],
    }),
  })

  console.log('训练完成:', history)
}
</script>
