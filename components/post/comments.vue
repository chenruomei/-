<template>
  <div class="cmt-wrapper">
    <h4 class="cmt-title">评论</h4>
    <!---->
    <div class="cmt-input">
      <div class="el-textarea">
        <textarea
          autocomplete="off"
          placeholder="说点什么吧..."
          class="el-textarea__inner"
          style="resize: none; min-height: 33px;"
        ></textarea>
      </div>
    </div>
    <div class="cmt-input-ctrls el-row is-justify-space-between el-row--flex">
      <div class="cmt-pics">
        <div>
          <ul class="el-upload-list el-upload-list--picture-card"></ul>
          <div tabindex="0" class="el-upload el-upload--picture-card">
            <i class="el-icon-plus"></i>
            <input type="file" name="files" class="el-upload__input" />
          </div>
        </div>
        <div class="el-dialog__wrapper" style="display: none;">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="dialog"
            class="el-dialog"
            style="margin-top: 15vh;"
          >
            <div class="el-dialog__header">
              <span class="el-dialog__title"></span>
              <button type="button" aria-label="Close" class="el-dialog__headerbtn">
                <i class="el-dialog__close el-icon el-icon-close"></i>
              </button>
            </div>
            <!---->
            <!---->
          </div>
        </div>
      </div>
      <div>
        <button type="button" class="el-button cmt-submit el-button--primary el-button--mini">
          <!---->
          <!---->
          <span>提交</span>
        </button>
      </div>
    </div>
    <!---->
    <div class="cmt-list">
      <div class="cmt-item">
        <div class="cmt-info">
          <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
          管理员
          <i>2020-04-29 11:20</i>
          <span>3</span>
        </div>
        <div class="cmt-content">
          <div class="cmt-floor">
            <div class="cmt-floor">
              <!---->
              <div class="cmt-content">
                <div class="cmt-info">
                  管理员
                  <i>2020-04-24 9:57</i>
                  <span>1</span>
                </div>
                <p class="cmt-message">好</p>
                <div class="el-row el-row--flex"></div>
                <div class="cmt-ctrl">
                  <a href="javascript:;">回复</a>
                </div>
              </div>
            </div>
            <div class="cmt-content">
              <div class="cmt-info">
                管理员
                <i>2020-04-29 10:41</i>
                <span>2</span>
              </div>
              <p class="cmt-message">你好</p>
              <div class="el-row el-row--flex"></div>
              <div class="cmt-ctrl">
                <a href="javascript:;">回复</a>
              </div>
            </div>
          </div>
          <div class="cmt-new">
            <p class="cmt-message">1111</p>
            <div class="el-row el-row--flex">
              <div class="cmt-pic">
                <img src="http://157.122.54.189:9095/uploads/65d8477f01304b7eaa99aabf22875820.jpg" />
              </div>
            </div>
            <div class="cmt-ctrl">
              <a href="javascript:;">回复</a>
            </div>
          </div>
        </div>
      </div>
      <div class="cmt-item">
        <div class="cmt-info">
          <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
          管理员
          <i>2020-04-29 11:19</i>
          <span>1</span>
        </div>
        <div class="cmt-content">
          <!---->
          <div class="cmt-new">
            <p class="cmt-message">111</p>
            <div class="el-row el-row--flex"></div>
            <div class="cmt-ctrl">
              <a href="javascript:;">回复</a>
            </div>
          </div>
        </div>
      </div>
      <div class="cmt-item">
        <div class="cmt-info">
          <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
          管理员
          <i>2020-04-29 11:19</i>
          <span>1</span>
        </div>
        <div class="cmt-content">
          <!---->
          <div class="cmt-new">
            <p class="cmt-message">111</p>
            <div class="el-row el-row--flex"></div>
            <div class="cmt-ctrl">
              <a href="javascript:;">回复</a>
            </div>
          </div>
        </div>
      </div>
      <div class="cmt-item">
        <div class="cmt-info">
          <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
          管理员
          <i>2020-04-29 11:07</i>
          <span>4</span>
        </div>
        <div class="cmt-content">
          <div class="cmt-floor">
            <div class="cmt-floor">
              <div class="cmt-floor">
                <!---->
                <div class="cmt-content">
                  <div class="cmt-info">
                    管理员
                    <i>2020-04-24 9:57</i>
                    <span>1</span>
                  </div>
                  <p class="cmt-message">好</p>
                  <div class="el-row el-row--flex"></div>
                  <div class="cmt-ctrl">
                    <a href="javascript:;">回复</a>
                  </div>
                </div>
              </div>
              <div class="cmt-content">
                <div class="cmt-info">
                  管理员
                  <i>2020-04-29 10:41</i>
                  <span>2</span>
                </div>
                <p class="cmt-message">你好</p>
                <div class="el-row el-row--flex"></div>
                <div class="cmt-ctrl">
                  <a href="javascript:;">回复</a>
                </div>
              </div>
            </div>
            <div class="cmt-content">
              <div class="cmt-info">
                管理员
                <i>2020-04-29 11:06</i>
                <span>3</span>
              </div>
              <p class="cmt-message">你不好</p>
              <div class="el-row el-row--flex"></div>
              <div class="cmt-ctrl">
                <a href="javascript:;">回复</a>
              </div>
            </div>
          </div>
          <div class="cmt-new">
            <p class="cmt-message">你太好</p>
            <div class="el-row el-row--flex"></div>
            <div class="cmt-ctrl">
              <a href="javascript:;">回复</a>
            </div>
          </div>
        </div>
      </div>
      <div class="cmt-item">
        <div class="cmt-info">
          <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
          管理员
          <i>2020-04-29 11:06</i>
          <span>3</span>
        </div>
        <div class="cmt-content">
          <div class="cmt-floor">
            <div class="cmt-floor">
              <!---->
              <div class="cmt-content">
                <div class="cmt-info">
                  管理员
                  <i>2020-04-24 9:57</i>
                  <span>1</span>
                </div>
                <p class="cmt-message">好</p>
                <div class="el-row el-row--flex"></div>
                <div class="cmt-ctrl">
                  <a href="javascript:;">回复</a>
                </div>
              </div>
            </div>
            <div class="cmt-content">
              <div class="cmt-info">
                管理员
                <i>2020-04-29 10:41</i>
                <span>2</span>
              </div>
              <p class="cmt-message">你好</p>
              <div class="el-row el-row--flex"></div>
              <div class="cmt-ctrl">
                <a href="javascript:;">回复</a>
              </div>
            </div>
          </div>
          <div class="cmt-new">
            <p class="cmt-message">你不好</p>
            <div class="el-row el-row--flex"></div>
            <div class="cmt-ctrl">
              <a href="javascript:;">回复</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="el-row is-justify-center el-row--flex" style="margin-top: 10px;">
      <div class="el-pagination">
        <span class="el-pagination__total">共 100 条</span>
        <span class="el-pagination__sizes">
          <div class="el-select el-select--mini">
            <!---->
            <div class="el-input el-input--mini el-input--suffix">
              <!---->
              <input
                type="text"
                readonly="readonly"
                autocomplete="off"
                placeholder="请选择"
                class="el-input__inner"
              />
              <!---->
              <span class="el-input__suffix">
                <span class="el-input__suffix-inner">
                  <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
                  <!---->
                  <!---->
                </span>
                <!---->
              </span>
              <!---->
            </div>
            <div class="el-select-dropdown el-popper" style="display: none; min-width: 110px;">
              <div class="el-scrollbar" style>
                <div
                  class="el-select-dropdown__wrap el-scrollbar__wrap"
                  style="margin-bottom: -17px; margin-right: -17px;"
                >
                  <ul class="el-scrollbar__view el-select-dropdown__list">
                    <!---->
                    <li class="el-select-dropdown__item selected">
                      <span>2条/页</span>
                    </li>
                    <li class="el-select-dropdown__item">
                      <span>4条/页</span>
                    </li>
                    <li class="el-select-dropdown__item">
                      <span>6条/页</span>
                    </li>
                    <li class="el-select-dropdown__item">
                      <span>8条/页</span>
                    </li>
                  </ul>
                </div>
                <div class="el-scrollbar__bar is-horizontal">
                  <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
                </div>
                <div class="el-scrollbar__bar is-vertical">
                  <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
                </div>
              </div>
              <!---->
            </div>
          </div>
        </span>
        <button type="button" disabled="disabled" class="btn-prev">
          <i class="el-icon el-icon-arrow-left"></i>
        </button>
        <ul class="el-pager">
          <li class="number active">1</li>
          <!---->
          <li class="number">2</li>
          <li class="number">3</li>
          <li class="number">4</li>
          <li class="number">5</li>
          <li class="number">6</li>
          <li class="el-icon more btn-quicknext el-icon-more"></li>
          <li class="number">50</li>
        </ul>
        <button type="button" class="btn-next">
          <i class="el-icon el-icon-arrow-right"></i>
        </button>
        <span class="el-pagination__jump">
          前往
          <div class="el-input el-pagination__editor is-in-pagination">
            <!---->
            <input type="number" autocomplete="off" min="1" max="50" class="el-input__inner" />
            <!---->
            <!---->
            <!---->
          </div>页
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
  .cmt-title {
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 20px;
  }
  .cmt-input {
    margin-bottom: 10px;
  }
  .cmt-input-ctrls {
    margin-bottom: 30px;
    .el-upload--picture-card {
      width: 100px;
      height: 100px;
      line-height: 100px;
    }
  }
  .cmt-list {
    border: 1px solid #ddd;
    .cmt-item {
      border-bottom: 1px dashed #ddd;
      padding: 20px 20px 5px;
      .cmt-info {
        margin-bottom: 10px;
        font-size: 12px;
        color: #666;
        img {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          vertical-align: top;
        }
        i {
          color: #999;
        }
      }
      .cmt-content {
        padding: 0 0 0 30px;
        .cmt-floor {
          background: #f9f9f9;
          border: 1px solid #ddd;
          padding: 2px;

          .cmt-content {
            padding: 5px 10px 0;
          }
          .cmt-content:hover .cmt-ctrl a {
            display: inline;
          }
        }
        .cmt-new:hover .cmt-ctrl a {
          display: inline;
        }
      }
      .cmt-message {
        margin-top: 10px;
      }
      .cmt-ctrl {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #1e50a2;
        text-align: right;
        a {
          display: none;
        }
      }
    }
  }
</style>