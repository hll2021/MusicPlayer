<template>
  <div>
    <!-- 搜索框 -->
      <van-search v-model="searchValue" 
        :placeholder="searchDefault" shape="round" 
        show-action autocomplete="off"
        @search="searchBtnFn" 
        @input="getSuggestFn" 
        @focus="if(!this.prepareSearch) this.prepareSearch = true;" 
        @clear="suggestList = []">
        <template #action>
          <div @click="searchBtnFn" class="search-button">搜索</div>
        </template>
      </van-search>

    <!-- 搜索历史和热门搜索 -->
    <div v-if="prepareSearch && suggestList.length === 0">
      <!-- 搜索历史 -->
      <div class="search-wrap" v-show="historyList.length != 0">
        <van-cell title="历史搜索" class="sub-title" icon="clock-o">
          <template #right-icon>
            <van-icon name="delete-o" class="delete-icon" @click="deleteAllHistory" />
          </template>
        </van-cell>
        <ul class="history-name-wrap">
          <li class="history-item" 
          v-for="(item, index) in historyList" 
          :key="index" @mousedown="resultFn(item)">
            {{ item }}
          </li>
          <li class="arrow-item" v-show="showAllArrow">
            <van-icon name="arrow-down" @click="showAllHistory" />
          </li>
          <li class="arrow-item" v-show="showCutArrow">
            <van-icon name="arrow-up" @click="cutHistory" />
          </li>
        </ul>
      </div>
      <!-- 热搜推荐 -->
      <div class="search-wrap" >
        <p class="sub-title">
          <van-icon name="fire" color="#8648D3" size="0.48rem"/> 热门搜索</p>
        <van-row class="hot-name-wrap">
          <van-col class="hot-item" 
            v-for="(obj, index) in hotList" 
            :key="index" :value="obj.first"
            @mousedown="resultFn(obj.first)">
            {{obj.first}}
          <van-icon v-show="index < 3" name="fire" color="red" />
          </van-col>
        </van-row>
      </div>
    </div>

    <!-- 搜索建议  -->
    <div v-else-if="prepareSearch && suggestList.length != 0"
      class="suggest-wrap">
        <van-list>
          <van-cell icon="search" :key="index" 
            v-for="(obj, index) in suggestList" 
            @mousedown="resultFn(obj.keyword)">
              <SuggestHighLight 
                :content="obj.keyword"
                :keyword="searchValue">
              </SuggestHighLight>
          </van-cell>
        </van-list>
    </div>
    
    <!-- 搜索结果 -->
    <div v-else class="search-wrap">
      <p class="sub-title">搜索结果</p>
      <div class="van-list-wrap"
        :style="{'height': (currentId && !fullScreen) ? 'calc(100vh - 240px)' :
        'calc(100vh - 180px)'}">
        <van-list 
          v-model:loading="loading" 
          :finished="finished" 
          :immediate-check="false" 
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载" 
          @load="onLoad">
          <SongItem v-for="(item, index) in searchResList"  
            :key="item.id" 
            :name="item.name" 
            :author="item.artists[0].name"
            :id="item.id" 
            :index="index">
          </SongItem>
        </van-list>
      </div>
    </div>
</div>
</template>

<script>
import {
  searchDefaultAPI, searchHotAPI, 
  searchSuggestAPI, searchResultAPI,
  } from '@/api/index'
import SongItem from '@/components/SongItem';
import SuggestHighLight from '@/components/SuggestHighLight.vue'
import { debounce } from '@/utils/debounce';

export default {
  data() {
    return {
      searchValue: '', //搜索关键词
      searchDefault: '',  //默认搜索关键词
      prepareSearch: true,  //判断用户是否准备搜索歌曲
      historyList: this.getLocalHistoryList(), //搜索本地历史记录
      showAllArrow: false, //是否显示全部历史记录
      showCutArrow: false, //是否折叠部分历史记录
      hotList: [], //热搜歌曲
      suggestList: [],  //搜索建议
      searchResList: [], //搜索结果
      loading: false, //是否正在加载结果数据
      finished: false, //是否加载完成结果数据
      page: 1 //分页数
    }
  },
  name: 'search-view',
  computed: {
    fullScreen() {
      return this.$store.state.fullScreen;
    },
    currentId() {
      return this.$store.state.currentId;
    }
  },
  watch: {
    suggestList() {
      //判断是否从搜索建议页面跳转到历史/热门搜索页面
      if (this.prepareSearch &&
        (this.suggestList.length === 0 || this.searchValue === '')) {
        //等待历史记录项DOM更新后立即使用它
        this.$nextTick(() => this.cutOverflowHistoryItem());
      }
    }
  },
  created() {
    this.getSearchDefault();
    this.getHotListRes();
    this.getLocalHistoryList();
  },
  mounted(){
    if (this.historyList.length) {
      this.cutOverflowHistoryItem();
    }
  },
  methods: {
    //获取默认搜索值
    async getSearchDefault() {
      const searchDefaultRes = await searchDefaultAPI({ realIP: '116.25.146.177'});
      this.searchDefault = searchDefaultRes.data.data.showKeyword;
    },
    //获取热门搜索
    async getHotListRes() {
      const hotListRes = await searchHotAPI({ realIP: '116.25.146.177'});
      this.hotList = hotListRes.data.result.hots;
    },
    //获取搜索数据
    async getListFn() {
      return await searchResultAPI({
        keywords: this.searchValue,
        limit: 15,
        offset: (this.page - 1) * 15, //接口文档说明的固定公式
        realIP: '116.25.146.177'
      });
    },
    //获取搜索建议,使用防抖
    getSuggestFn: debounce(async function() {
        if (this.searchValue.trim() === '') {
          this.suggestList = [];
          return;
        }
        const res = await searchSuggestAPI({
          keywords: this.searchValue,
          type: 'mobile',
          realIP: '116.25.146.177'
        });
        if (res.data.result.allMatch === undefined) {
          this.suggestList = [];
          return;
        }
        this.suggestList = res.data.result.allMatch;
      }, 200)
    ,
    //点击搜索按钮或键盘上的搜索键
    async searchBtnFn() {
      if(this.searchValue === '') {
        this.searchValue = this.searchDefault;
        //获取建议数据以便后面聚焦搜索框时直接展示
        this.getSuggestFn();
      } else if(this.searchValue.trim() === '') {
        vant.Toast.fail('请输入你要搜索的歌曲');
        return;
      }
      this.addHistoryItem(this.searchValue);
      //显示搜索结果页面
      this.prepareSearch = false;
      //重置分页数
      this.page = 1;
      this.finished = false;
      const searchRes = await this.getListFn();  
      if (searchRes.data.result.songCount === 0) {
        vant.Dialog.alert({
          message: '找不到你要的歌曲'
        })
        return;
      }
      //过滤付费、vip和无版权歌曲
      this.searchResList = searchRes.data.result.songs.filter(song => {
        return song.fee === 8 || song.fee === 0 && !song.noCopyrightRcmd;
      });
      this.loading = false;
    },
    //点击了搜索建议/热门关键词/搜索历史记录
    async resultFn(name) {
      this.searchValue = name;
      this.addHistoryItem(name);
      //获取建议数据以便后面聚焦搜索框时直接展示
      this.getSuggestFn();
      //显示搜索结果页面
      this.prepareSearch = false;
      //重置分页数
      this.page = 1;
      this.finished = false;
      const searchRes = await this.getListFn();
      //过滤付费、vip和无版权歌曲
      this.searchResList = searchRes.data.result.songs.filter(song => {
        return song.fee === 8 || song.fee === 0 && !song.noCopyrightRcmd;
      });
      this.loading = false;
    },
    // 加载下一页数据, 内部自动把loading改为true
    async onLoad() {
      this.page++;
      const res = await this.getListFn();
      if (res.data.result.songs === undefined) {
        //没有更多数据可以加载
        this.finished = true;
      } else {
        this.searchResList.push(...res.data.result.songs);
      }
      this.loading = false;
    },

    //获取搜索本地历史记录
    getLocalHistoryList() {
      if (!localStorage.getItem('historyList')) {
        localStorage.setItem('historyList', '[]');
      } 
      this.historyList = JSON.parse(localStorage.getItem('historyList'));
      return this.historyList
    },
    //添加搜索历史记录项
    addHistoryItem(name) {
      if(this.historyList.includes(name)) {
        this.historyList = this.historyList.filter(n => n != name);
      }
      if(this.historyList.length === 15) {
        this.historyList.pop();
      }
      this.historyList.unshift(name);
      localStorage.setItem('historyList', JSON.stringify(this.historyList));
    },
    //展示所有搜索历史记录
    showAllHistory() {
      this.showAllArrow = false;
      this.showCutArrow = true;
      const items = document.querySelectorAll('.history-item');

      items.forEach((item) => {
        item.style.display = 'inline-block';
      })
    },
    //点击了“折叠搜索历史记录”的箭头
    cutHistory() {
      this.showCutArrow = false;
      this.cutOverflowHistoryItem();
    },
    //执行折叠搜索历史记录
    cutOverflowHistoryItem() {
      this.showCutArrow = false;
      const items = document.querySelectorAll('.history-item');
      if(!items.length) return;

      let line = 0;
      let offsetLeft = items[0].offsetLeft;
      for(let i = 0; i < items.length; i++) {
        if (items[i].offsetLeft === offsetLeft) {
          line++;
        }
        if (line === 3) {
          this.showAllArrow = true;
          for(let j = i - 1; j < items.length; j++) {
            items[j].style.display = 'none';
          }
          break;
        }
      }
    },
    //清空所有搜索历史记录
    deleteAllHistory() {
      vant.Dialog.confirm({
        title:'',
        message:
          '确认删除全部历史记录？',
        confirmButtonColor: '#8648D3'
      })
        .then(() => {
          this.historyList = [];
          localStorage.setItem('historyList', '[]');
          this.showAllArrow = this.showCutArrow = false;
        })
        .catch(() => {
          return;
        });
    }
  },
  components: {
    SongItem,
    SuggestHighLight
  },
}
</script>

<style>
:root {
  --van-search-input-height: 36px;
  --van-dialog-message-font-size: 16px;
}
.search-button {
  padding:0 4px 0 6px;
  font-size: 16px;
}
.search-wrap {
  padding: 5px;
  margin-bottom: 10px;
}
.sub-title {
  font-size: 14px;
  font-weight: bold;
  padding: 0;
}
.arrow-item,
.history-item {
  display: inline-block;
  padding: 5px 10px;
  margin: 8px 8px 0 0;
  font-size: 12px;
  background-color: #FAFAFA;
  border: 1px solid #fff;
  border-radius: 20px;
}
.hot-item {
  display: inline-block;
  margin: 10px 10px 0 0;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #FAFAFC;
  border: 1px solid #DED6E8;
  border-radius: 20px;
}
.delete-icon {
  font-size: 20px;
  padding-right: 5px;
}
.history-name-wrap {
  margin-bottom: 10px;
}
.suggest-wrap {
  padding-left: 10px;
}
.suggest-wrap .van-icon {
  color: #969799
}
.van-list-wrap {
  overflow-y: auto;
}
.van-list-wrap::-webkit-scrollbar {
  display: none;
}
</style>