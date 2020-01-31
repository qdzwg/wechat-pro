<template>
  <div class="topContacts" @click="noShow">
    <navbar :backShow='false' title=''></navbar>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
      <navbar title='常用联系人'></navbar>
      <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
        <div class="contact-list clearfix" v-if="dataList.length>0" v-for="(item,index) in dataList" :key="index">
          <div class="con-left">
            <p class="con-name">{{item.name}}</p>
            <div class="con-tel">
              <img src="http://statics.lotsmall.cn/wx/img/icon-tel.png" alt="" class="con-tel-img">
              <span class="con-text">{{item.phone}}</span>
            </div>
            <div class="con-tel" v-if="item.certNo">
              <img src="http://statics.lotsmall.cn/wx/img/icon-idcard.png" alt="" class="con-idcard-img">
              <span class="con-text">{{item.certNo}}</span>
            </div>
            <div class="con-tel" v-else>
              <span class="con-text text2">信息不全，点击补充</span>
            </div>
          </div>
          <div class="con-box clearfix">
            <div class="del-right" :class='{move:delBtnShow==item.id}' @click="del(item.id)">
              <span class="span-text">删除</span>
            </div>
            <div class="con-right">
              <div class="operation" @click="editCon(item.id)">
                <img src="http://statics.lotsmall.cn/wx/img/icon-edit.png" alt="" class="con-edit-img">
              </div>
              <div class="operation" @click.stop="delCon(item.id)">
                <img src="http://statics.lotsmall.cn/wx/img/icon-del.png" alt="" class="con-del-img">
              </div>
            </div>
          </div>
        </div>
        <div v-if="dataList.length<=0">
          <div class="no-cash">暂无联系人</div>
        </div>
        <div class="addContact" @click="goUrl('pages/member/topContacts/newContacts/main')">
          <span>添加联系人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Use Vuex
import { getData, postData, merchantInfoId } from "@/common/common";
import navbar from "@/components/navbar";
export default {
  components: {
    navbar
  },
  computed: {},
  data() {
    return {
      delBtnShow: "",
      dataList: []
    };
  },
  onLoad() {
    //   getData(this.api.contacts.getContactsList, {
    //     leaguerId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
    //   }).then(res => {
    //     console.log(res);
    //   });
  },
  onUnload() {
    this.delBtnShow = "";
  },
  onShow() {
    this.getList();
  },
  methods: {
    noShow(e) {
      this.delBtnShow = "";
    },
    getList() {
      // getData(this.api.contacts.getContactsList, {
      //   leaguerId: wx.getStorageSync("WxXjscUserInfo").leaguerId
      // }).then(res => {
      //   if (res.status == 200) {
      //     console.log("常用联系人",res)
      //     this.dataList = res.data;
      //   } else {
      //     wx.showToast({
      //       title: res.message,
      //       icon: "none",
      //       duration: 2000
      //     });
      //   }
      // });
    },
    gotoGame(path) {
      this.reLaunchPageTo(this.router + path);
    },
    goUrl(path) {
      this.navigatePageTo(this.router + path);
    },
    editCon(id) {
      this.navigatePageTo(
        this.router + "pages/member/topContacts/newContacts/main?id=" + id
      );
    },
    delCon(id) {
      this.delBtnShow = id;
      return false;
    },
    del(id) {
      getData(this.api.contacts.deleteContacts, {
        id: id
      }).then(res => {
        if (res.status == 200) {
          wx.showToast({
            title: "删除成功",
            icon: "success",
            duration: 2000
          });
          this.getList();
        }
      });
    }
  }
};
</script>

<style lang="scss">
.topContacts {
  width: 100%;
  overflow: hidden;
  padding-bottom: 50px;
  .no-cash {
    text-align: center;
    padding: 15px;
    font-size: 16px;
    color: #413838;
    font-family: PingFangSC-Medium, sans-serif;
  }
  .contact-list {
    // width: 100%;
    height: 89.5px;
    background-color: #fff;
    // padding: 0 15px;
    padding-left: 15px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    .con-left {
      width: 70%;
      float: left;
      .con-name {
        color: #413838;
        font-size: 14px;
        font-family: PingFangSC-Medium, sans-serif;
      }
      .con-tel {
        color: #7a7373;

        .con-tel-img {
          display: inline-block;
          vertical-align: middle;
          width: 7.5px;
          height: 11px;
        }
        .con-idcard-img {
          display: inline-block;
          vertical-align: middle;
          width: 10.5px;
          height: 8.5px;
        }
        .con-text {
          margin-left: 10px;
          font-size: 12px;
        }
        .text2 {
          color: #f05b47;
        }
      }
    }
    .con-box {
      width: 102.5px;
      height: 89.5px;
      position: relative;
      .con-right {
        // width: 50px;
        height: 89.5px;
        float: right;
        display: flex;
        align-items: center;
        padding-right: 20px;
        .operation {
          // width: 15%;
          display: inline-block;
          margin-right: 20px;
          .con-edit-img {
            display: inline-block;
            vertical-align: middle;
            width: 19px;
            height: 19.5px;
          }
          .con-del-img {
            display: inline-block;
            vertical-align: middle;
            width: 16.5px;
            height: 18.5px;
          }
        }
        .operation:last-child {
          margin-right: 0;
        }
      }
      .del-right {
        position: absolute;
        width: 102.5px;
        height: 89.5px;
        top: 0;
        right: -115px;
        line-height: 89.5px;
        font-size: 16px;
        text-align: center;
        background-color: #f05b47;
        color: #fff;
        transition: all 0.3s linear;
      }
      .move {
        right: -7px;
      }
    }
  }
  .addContact {
    width: 100%;
    height: 49px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #f05b47;
    color: #fff;
    text-align: center;
    line-height: 49px;
    font-size: 16px;
  }
  .topContacts::-webkit-scrollbar {
    width: 0;

    height: 0;

    color: transparent;
  }
}
</style>
