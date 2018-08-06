<template>
  <div class="bar">
    <div class="bar-item" v-for="(value,index) in items" :class="{ 'is-active': isActive(index)}" @click="handSelect(index)">
      <div class="bar-item-icon" style="">
        <img class="default" :src="value.default_img_src" alt="">
        <img class="active" :src="value.active_img_src" alt="">
      </div>
      <div class="bar-item-label">
        <span><router-link :to="value.url">{{value.label}}</router-link></span>
      </div>
    </div>
  </div>
</template>

<script>
  import workbench from '../../assets/images/workbench.svg'
  import workbenchActive from '../../assets/images/workbench_active.svg'
  import cutomer from '../../assets/images/customers.svg'
  import cutomerActive from '../../assets/images/customers_active.svg'
  import task from '../../assets/images/task.svg'
  import taskActive from '../../assets/images/task_active.svg'
  import personal from '../../assets/images/personal_center.svg'
  import personalActive from '../../assets/images/personal_center_active.svg'
export default {
  name: 'bar',
  props:{

  },
  mounted() {

  },
  data () {
    return {
      selectedIndex:0,
      items:[
        {
          label:'工作台',
          type:'image',
          default_img_src:workbench,
          active_img_src:workbenchActive,
          url:'/'
        },
        {
          label:'客户管理',
          type:'image',
          default_img_src:cutomer,
          active_img_src:cutomerActive,
          url:'/customer'
        },
        {
          label:'任务管理',
          type:'image',
          default_img_src:task,
          active_img_src:taskActive,
          url:'/task'
        },
        {
          label:'个人中心',
          type:'image',
          default_img_src:personal,
          active_img_src:personalActive,
          url:'/user'
        }
      ]
    }
  },
  methods: {
    isActive(index){
      return this.items[index].url==this.$route.path;
    },
    handSelect(index){
      this.selectedIndex=index;
    }
  }
}
</script>
<style lang="scss">
  .bar{
      width: 100%; display: flex;height: 50px;
      .bar-item{
        width: 25%;display: flex;flex-direction: column;align-items: center;justify-content: center;
        .bar-item-icon{
          width: 24px;height: 19px;
          .active{
            display: none;
          }
        }
        .bar-item-label{
          margin-top:4px;
          span{
            font-size: 14px;
            color: #FFFFFF;
            a{
              color: #FFFFFF;
            };
          }
        }
      }
      .bar-item.is-active{
        .bar-item-icon{
          .default{
            display: none;
          }
          .active{
            display: block;

          }
        }
        .bar-item-label{
          span{
            a{
              color: #47D98F;
            };
          }
        }
      }
  }
</style>
