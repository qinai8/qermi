<template>
	<div class="alide" @click="dialogOff">
		<div class="alide-scroll" ref="scroll">
			<div class="alide-box" @mousewheel="mousewheel" ref="box">
				<!-- @contextmenu.prevent 阻止浏览器右键打开默认弹窗 -->
				<li class="lis" ref="lis" v-for="(item,index) in ontice" :key="index"
					:class="oindex == index ? 'oli' : ''" @click="show(index)" @mousedown="dialogON(index)"
					@contextmenu.prevent>
					{{item.name}}
					<span @click.stop="deletes(index)">×</span>
				</li>
			</div>
		</div>
		<div class="getupdow" ref="dialog" v-show="shows">
			<p @click="Refresh">刷新</p>
			<p @click="oclose">关闭</p>
			<p @click="closeOther">关闭其他</p>
			<p @click="closeAll">关闭所有</p>
		</div>
	</div>
</template>

<script>
export default {
  props: ['ontice'],
  data () {
    return {
      oindex: 0, // 当前显示下标
      closeIndex: '', // 被关闭下标
      shows: false
    }
  },
  created () {
    this.onRouteChanged()
    console.log(this.ontice)
  },
  methods: {
    // 获取路由参数
    onRouteChanged () {
      for (let i = 0; i < this.ontice.length; i++) {
        if (this.ontice[i].name == this.$route.name) {
          this.oindex = i
        }
      }
    },
    show (index) {
      this.oindex = index
      this.move()
    },
    // 页面刷新
    Refresh () {
      this.$router.push('/iouert')
    },
    // 删除
    deletes (index) {
      const name = this.ontice[this.oindex].name
      this.ontice.splice(index, 1)
      if (index < this.oindex || index == this.oindex && index > 0) {
        this.oindex = this.oindex - 1
      }
      this.move()
    },
    // 删除后跳转的路由
    move () {
      if (this.ontice.length <= 0) {
        this.$router.push('/home')
      } else {
        if (this.$route.path !== this.ontice[this.oindex].url) {
          this.$router.push(this.ontice[this.oindex].url)
        }
      }
    },
    // 自定义右键弹出窗口
    dialogON (index) {
      this.closeIndex = index
      if (event.button == 2) {
        const e = event || window.event
        const wid = document.body.scrollWidth
        const otable = this.$refs.dialog
        this.shows = true
        otable.style.top = e.screenY - 100 + 'px'
        if ((wid - 100) < e.screenX) {
          otable.style.left = e.screenX - 85 + 'px'
        } else {
          otable.style.left = e.screenX + 5 + 'px'
        }
      }
    },
    // 关闭自定义窗口
    dialogOff () {
      this.shows = false
    },
    parentMsg: function () {
      this.dialogOff()
    },
    // 关闭
    oclose () {
      this.deletes(this.closeIndex)
    },
    // 关闭其他
    closeOther () {
      const obj = this.ontice[this.closeIndex]
      this.ontice.splice(0, this.ontice.length)
      this.ontice.push(obj)
      this.oindex = 0
      this.move()
    },
    // 关闭所有
    closeAll () {
      this.ontice.splice(0, this.ontice.length)
      this.move()
    },
    // 鼠标滚动事件
    mousewheel: function () {
      const e = window.event
      const scroll = this.$refs.scroll
      if (e.wheelDelta > 0) {
        // 鼠标向上滚动
        scroll.scrollLeft -= 20
      } else {
        // 鼠标向下滚动
        scroll.scrollLeft += 20
      }
    }
  },
  watch: {
    $route: 'onRouteChanged'
  }
}
</script>

<style lang="less" scoped="scoped">
	* {
		list-style: none;
		border:0px;
	}

	.alide {
		width: 100%;
		height: 39px;
		overflow: hidden;
	}

	.alide-scroll {
		display: flex;
		overflow-x: scroll;
		position: relative;
	}

	.alide-box {
		height: 39px;
		padding: 0px 20px;
		display: flex;
		align-items: center;
		position: relative;
	}

	.lis {
		white-space: nowrap;
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		margin-right: 10px;
		padding: 0px 10px;
		border: 1px solid #D8DCE5;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.oli {
		color: #FFFFFF;
		border: none;
		background-color: #00ab00;
	}

	.oli::before {
		content: " ";
		width: 8px;
		height: 8px;
		margin-right: 5px;
		border-radius: 50%;
		background-color: #FFFFFF;
	}

	.lis>span {
		width: 20px;
		line-height: 20px;
		text-align: center;
		margin-left: 10px;
		border-radius: 50%;
	}

	.lis>span:hover {
		color: #FFFFFF;
		background-color: #F9470B;
	}

	.getupdow {
		width: 80px;
		line-height: 30px;
		font-size: 13px;
		padding: 5px 0px;
		border-radius: 5px;
		box-shadow: 2px 2px 2px #C2C2C2;
		background-color: #FFFFFF;
		position: absolute;
		z-index: 99999;
	}

	.getupdow>P {
		padding-left: 10px;
		background-color: #FFFFFF;
	}

	.getupdow>P:hover {
		background-color: #EEEEEE;
	}
</style>
