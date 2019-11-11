import DataBus from './databus';
import BackGround from './runtime/background';

import Player from './player/index';
import Enemy from './npc/enemy';
import GameInfo from './runtime/gameinfo';
import Music from './runtime/music';

const ctx = canvas.getContext('2d')
const dataBus = new DataBus();

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.restart();
  }

  restart() {
    dataBus.reset();
    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    );
    this.bg = new BackGround(ctx);
    this.music = new Music();
    this.player = new Player(ctx);
    this.gameInfo = new GameInfo();
    window.requestAnimationFrame(this.loop.bind(this), canvas);
  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    if (dataBus.frame % 30 === 0) {
      const enemy = dataBus.pool.getItemByClass('enemy', Enemy)
      enemy.init(6);
      dataBus.enemies.push(enemy);
    }
  }

  // 全局碰撞检测
  collisionDetection() {
    const that = this;
    dataBus.bullets.forEach((bullet) => {
      for (let i = 0, il = dataBus.enemies.length; i < il; i++) {
        let enemy = dataBus.enemies[i];
        if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
          enemy.playAnimation();
          that.music.playExplosion();
          bullet.visible = false;
          dataBus.score += 1;
          break;
        }
      }
    });

    for (let i = 0, il = dataBus.enemies.length; i < il; i++) {
      let enemy = dataBus.enemies[i];
      if (this.player.isCollideWith(enemy)) {
        dataBus.gameOver = true;
        break;
      }
    }
  }

  //游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault();
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    let area = this.gameInfo.btnArea
    if (x >= area.startX &&
      x <= area.endX &&
      y >= area.startY &&
      y <= area.endY)
      this.restart();
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.bg.render(ctx);
    dataBus.bullets
      .concat(dataBus.enemies)
      .forEach((item) => {
        item.drawToCanvas(ctx)
      });

    this.player.drawToCanvas(ctx);

    dataBus.animations.forEach((ani) => {
      if (ani.isPlaying) {
        ani.aniRender(ctx);
      }
    });
    this.gameInfo.renderGameScore(ctx, dataBus.score);
  }

  // 游戏逻辑更新主函数
  update() {
    this.bg.update();
    dataBus.bullets
      .concat(dataBus.enemies)
      .forEach((item) => {
        item.update();
      });
    this.enemyGenerate();
    this.collisionDetection();
  }

  // 实现游戏帧循环
  loop() {
    dataBus.frame++; // ?
    this.update();
    this.render();
    if (dataBus.frame % 20 === 0) {
      this.player.shoot();
      this.music.playShoot();
    }
    // 游戏结束停止帧循环
    if (dataBus.gameOver) {
      this.gameInfo.renderGameOver(ctx, dataBus.score)
      this.touchHandler = this.touchEventHandler.bind(this)
      canvas.addEventListener('touchstart', this.touchHandler)
      return;
    }
    window.requestAnimationFrame(this.loop.bind(this), canvas);
  }
}