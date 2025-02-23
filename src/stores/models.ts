// stores/index.js
import { defineStore } from 'pinia'

interface ModelConfig {
  lossFunction: string
  numLayers: number
  units: number
  inputShape: number
  activationFunction: string
}

export const useModelStore = defineStore('model', {
  state: () => ({
    lossFunction: 'meanSquaredError',
    numLayers: 1,
    units: 1,
    inputShape: 1,
    activationFunction: 'relu',
    trainingData: null,
  }),
  actions: {
    setModelConfig(config: ModelConfig) {
      this.lossFunction = config.lossFunction
      this.numLayers = config.numLayers
      this.units = config.units
      this.inputShape = config.inputShape
      this.activationFunction = config.activationFunction
    },
    setTrainingData(data: any) {
      this.trainingData = data
    },
  },
})
