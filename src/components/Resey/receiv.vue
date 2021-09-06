<template>
	<div>
		<router-link></router-link>
		<div class="title" style="line-height: 0px;">
			<div style="margin-left: 25px;margin-top: 5px;" class="tab">
				<span v-for="(item, index) in ontice" :key="index" @click="overlaySelected(item, index)">
					<router-link :to="item.path" class="iofre" :class="{'select':item.state}">{{ item.name[1] }}</router-link>
				</span>
			</div>
		</div>
		<div class="title">
			<div v-for="(item, index) in selectList" :key="index" style="margin-right: 20px;position: relative;">
				<span class="delete" @click="deleteData(item, index)">x</span>
			</div>
		</div>
		<getup :message="kiser"></getup>
	</div>
</template>

<script>
import getup from './gortup.vue'
export default {
  name: 'tab',
  props: ['ontice'],
  data () {
    return {
      kiser: [],
      keyIndex: null,
      selectList: []
    }
  },
  methods: {
    // show () {
    //   console.log(this.ontice)
    // },
    // 选中事件
    overlaySelected (item) {
      item.state = !item.state
      const newarray = []
      for (var i = 0; i < this.ontice.length; i++) {
        if (this.ontice[i].state) {
          newarray.push(this.ontice[i])
        }
      }
      this.selectList = newarray
    },
    // // 删除事件
    deleteData (item, index) {
      this.selectList.splice(index, 1)
      for (var i = 0; i < this.ontice.length; i++) {
        this.ontice[i].name == item.name ? this.ontice[i].state = false : ''
      }
    },
    show () {
	  // console.log(this.$route.name);
	  this.kiser.push({
	    name: this.$route.name,
	    path: this.$route.path
	  })
	  // console.log(this.kiser);
    }
  },
  watch: {
    $route: 'show'
  },
  components: {
    getup
  },
  mounted () {
    this.show()
  }
}
</script>

<style scoped>
.iofre {
	text-decoration: none;
	color: white;
}
.title {
	margin-top: 20px;
	display: flex;
}

.tab span {
	border: 2px solid;
	padding: 6px 18px;
	border-radius: 6px;
	margin-right: 20px;
	cursor: pointer;
	background-color: #13ce66;
}
.select {
	background-color: #4395ff;
	border-color: #4395ff !important;
	color: #fff;
}
.delete {
	position: absolute;
	top: -37px;
	right: -128px;
	font-size: 15px;
	border: 2px solid;
	border-radius: 73px;
	width: 10px;
	height: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: #e33232;
}
</style>
