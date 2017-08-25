<template>
  <div>
    <h2>My selection</h2>

    <div class="ui container">
      <div class="ui relaxed divided list">
        <div class="item" v-for="item in mySelection">
          <div class="right floated content">
            <div class="ui button">-</div>
          </div>
          <i class="large rocket middle aligned icon"></i>
          <div class="content">
            <a class="header">{{ item.name }}</a>
            <div class="left meta">{{ item.manufacturer }}</div>
            <div class="left description">{{ item.cost_in_credits }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    mySelection: 'mySelection'
  })
}
</script>

<style scoped>
</style>
