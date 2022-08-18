<template>
  <div ref="virtual" class="virtual-empty" :style="{ height: 'calc(100vh - 100px)' }">
    <div class="virtual-container" :style="{ height: clacHeight + 'px', minHeight: height + 'px' }">
      <slot :topIndex="topIndex" :bottomIndex="bottomIndex"></slot>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash';
export default {
  name: 'VirtualScroll',
  props: {
    childHeight: {
      required: true,
      type: Number,
      default: 0
    },
    offset: {
      required: false,
      type: Number,
      default: 0
    },
    length: {
      required: true,
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      topIndex: 0,
      bottomIndex: 0,
      totalHeight: 0,
    }
  },
  mounted() {
    this.initScroll()
  },
  beforeDestroy() {
    this.virtualDom.removeEventListener('scroll', this.debounceScroll, { passive: true })
    this.virtualDom = null
  },
  computed: {
    clacHeight() {
      let length = this.length
      let height = length * this.childHeight;
      length = null
      return height
    }
  },
  methods: {
    initScroll() {
      if (!this.childHeight) return
      this.virtualDom = this.$refs['virtual']
      this.debounceScroll = _.debounce(this.scroll, 16)
      this.virtualDom.addEventListener('scroll', this.debounceScroll, { passive: true })
      this.scroll()
    },
    scroll() {
      let scrollTop = this.virtualDom.scrollTop
      this.topIndex = Math.floor((scrollTop - this.offset > 0 ? scrollTop - this.offset : scrollTop) / this.childHeight);
      this.bottomIndex = this.topIndex + Math.ceil((document.body.clientHeight + this.offset) / this.childHeight)
      scrollTop = null
    },
    // 重制滚动高度
    resetScrollTop() {
      this.virtualDom.scrollTop = 0
    }
  }
}
</script>

<style>
.virtual-empty {
  overflow-y: scroll;
}

.virtual-container {
  position: relative;
  width: 100%;
}
</style>