let shequ = {
  name: 'shequ',
  type: 'way',
  $game: null
};
//启动游戏
shequ.start = async function(that, request) {
  shequ.$game.setting = await shequ.$game.call('setting', request);
  //ui
  let ui = [];
  let user = shequ.$game.global.user;
  //用户信息
  ui.push({
    pos: 'tl',
    resid: '51D73031-80D9-F86D-0100-0AFE7F30FC05#main/nameBg.png',
    info: {
      position: 'absolute',
      left: 70,
      top: -5
    }
  });
  ui.push({
    pos: 'tl',
    info: {
      position: 'absolute',
      left: 7,
      top: 5,
      width: 78,
      height: 78,
      pic: user ? user.avatar : 'https://www.onez.cn/files/game/b94f7c528e95b913800a2e84514abf47/main/male.png',
      event: function() {
        console.log('点击头像');
      }
    }
  });
  ui.push({
    pos: 'tl',
    resid: '51D73031-80D9-F86D-0100-0AFE7F30FC05#main/frameBg.png'
  });
  ui.push({
    pos: 'tl',
    resid: 'font',
    info: {
      position: 'absolute',
      left: 152,
      top: 18,
      request: {
        size: 16,
        text: user ? user.nickname : '游客',
      },
      center: [0.5, 0.5],
      event: function() {
        console.log('点击昵称');
      }
    }
  });
  ui.push({
    pos: 'tl',
    resid: 'font',
    info: {
      position: 'absolute',
      left: 76,
      top: 78,
      request: {
        color: 'yellow',
        size: 15,
        text: user && user.player ? user.player.level : '0',
      },
      center: [0.5, 0.5],
      event: function() {
        console.log('aaa');
      }
    }
  });
  //场景信息
  ui.push({
    pos: 'tr',
    resid: '51D73031-80D9-F86D-0100-0AFE7F30FC05#main/image_mapBg.png',
    info: {
      children: [{
        resid: '51D73031-80D9-F86D-0100-0AFE7F30FC05#main/image_mapBtn.png',
        info: {
          left: 50,
          top: 30,
          event: {
            action: 'event',
            type: 'showMap'
          }
        }
      }]
    }
  });
  ui.push({
    pos: 'tr',
    resid: 'font',
    info: {
      position: 'absolute',
      left: 83,
      top: 20,
      global: {
        key: 'scene',
        field: 'request.text'
      },
      request: {
        size: 16,
        text: shequ.$game.global.scene || '...',
      },
      center: [0.5, 0.5],
      event: function() {
        console.log('点击场景名称');
      }
    }
  });
  //坐标
  ui.push({
    pos: 'tr',
    info: {
      text: '0,0',
      textStyle: 'font-weight:bold;color:#fff;width:100px;text-align:right;',
      position: 'absolute',
      left: 30,
      top: 130,
      global: {
        key: 'mypos',
        field: 'text'
      }
    }
  });
  //互动
  if (!shequ.$game.global.userid) {
    ui.push({
      pos: 'br',
      info: {
        children: [{
          resid: 'icon',
          info: {
            position: 'relative',
            request: {
              name: '登录',
            },
            event: {
              action: 'login'
            }
          }
        }, {
          resid: 'icon',
          info: {
            position: 'relative',
            request: {
              name: '注册',
            },
            event: {
              action: 'register'
            }
          }
        }]
      }
    });
  } else {
    let children = [];
    if (user.userRole.indexOf('admin') != -1) {
      children.push({
        resid: 'icon',
        info: {
          position: 'relative',
          request: {
            name: '管理',
          },
          event: {
            action: 'page',
            page: 'admin'
          }
        }
      });
    }
    if (user.userRole.indexOf('admin') != -1 || user.userRole.indexOf('gamebuilder') != -1) {
      children.push({
        resid: 'icon',
        info: {
          position: 'relative',
          request: {
            name: '造梦师',
          },
          event: {
            action: 'page',
            page: 'builder'
          }
        }
      });
    }
    children.push({
      resid: 'icon',
      info: {
        position: 'relative',
        request: {
          name: '背包',
        },
        event: {
          action: 'page',
          page: 'package'
        }
      }
    });
    children.push({
      resid: 'icon',
      info: {
        position: 'relative',
        request: {
          name: '消息',
        },
        event: {
          action: 'page',
          page: 'message'
        }
      }
    });
    children.push({
      resid: 'icon',
      info: {
        position: 'relative',
        request: {
          name: '设置',
        },
        event: {
          action: 'page',
          page: 'setting'
        }
      }
    });
    ui.push({
      pos: 'br',
      info: {
        children: children
      }
    });
  }
  return {
    ui: ui,
    scene: (user ? user.scene : null) || 'auto'
  };
};
//当前场景
shequ.scene = async function(that, request) {
  let info = await shequ.$game.call('scene', request);
  if (info.error) {
    shequ.$game.alert(info.error);
  }
  return info;
};
//加载角色信息
shequ.player = async function(that, request) {
  let info = await shequ.$game.call('player', request);
  if (info.error) {
    shequ.$game.alert(info.error);
  }
  return info;
};
//点击道具
shequ.prop = async function(that, request) {
  let data = {
    title: request.item.name
  };
  var record = [];
  let user = shequ.$game.global.user;
  if (user.userRole.indexOf('admin') != -1 || user.userRole.indexOf('gamebuilder') != -1) {
    record.push({
      type: 'link',
      text: '到我这里来',
      event: {
        callback: async function() {

          let r = await shequ.$game.call('data', {
            type: 'table',
            method: 'update',
            table: request.item.table || request.type,
            values: {
              mypos: shequ.$game.formatPos(shequ.$game.mypos)
            },
            where: {
              _id: request.item._id
            }
          });
          shequ.$game.sendMsg(that, {
            type: 'scene-update',
            scene: shequ.$game.scene
          });
        }
      }
    });
    record.push({
      type: 'link',
      text: '从当前场景删除',
      event: {
        callback: async function() {
          let r = await shequ.$game.call('data', {
            type: 'table',
            method: 'delete',
            table: request.item.table || request.type,
            where: {
              _id: request.item._id
            }
          });
          shequ.$game.sendMsg(that, {
            type: 'scene-update',
            scene: shequ.$game.scene
          });
        }
      }
    });
  }
  data.record = record;
  data.width = 320;
  data.height = 280;
  data.noscroll = false;
  data.nobtn = true;

  return await shequ.$game.$stage.dialog('dialog', data);
};
//智能加载素材资源
var cacheRes = {};
shequ.res = async function(that, request) {
  var hash = shequ.$game.md5(JSON.stringify(request));
  if (!cacheRes[hash]) {
    cacheRes[hash] = await shequ.$game.call('res', request);
  }
  return cacheRes[hash];
};

export default shequ;
