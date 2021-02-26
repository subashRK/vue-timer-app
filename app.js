const Timer = {
  data() {
    return {
      seconds: 0,
      interval: null,
      status: "running",
      lapse: [],
      disabled: false,
      count: 0
    }
  },
  methods: {
    runTimer() {
      this.interval = setInterval(() => {
        this.seconds++
      }, 1000)
    },
    displayText() {
      return this.status === "running" ? "Stop" : "Start"
    },
    handleTimer() {
      if (this.status === "running" && this.interval) {
        clearInterval(this.interval)
        this.status = "stopped"
        this.disabled = true
      } else {
        this.runTimer()
        this.status = 'running'
        this.disabled = false
      }
    },
    addLap(second) {
      this.lapse.unshift({
        count: this.count,
        second
      })

      this.count++
    },
    restart() {
      const confirmation = confirm("Are you sure? This will clear all the data.")

      const restartTimer = () => {
        this.seconds = 0
        this.status = "stopped"
        this.disabled = true
        this.lapse = []
        clearInterval(this.interval)
      }
      confirmation && restartTimer()
    },
    deleteLap(lap) {
      this.lapse = this.lapse.filter(currentLap => (
        !(currentLap.count === lap.count) && currentLap
      ))
    }
  },
  mounted() {
    this.runTimer()
  }
}

Vue.createApp(Timer).mount("#app")
