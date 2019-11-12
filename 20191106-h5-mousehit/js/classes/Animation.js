 /**
  * 逐帧动画组件
  */
 (function () {

   var Animation = function (cfg) {

     /**
      * 动画图片
      */
     this.img = null;
     /**
      * 帧列表  ，每帧的位置
      * @format {
      *     x: 0,
      *     y: 0,
      *     duration: 0,
      *     collRect: [[left, top, width, height]]
      * }
      */
     this.frames = [];
     /**
      * 循环播放
      */
     this.loop = true;
     /**
      * 播放倍速
      */
     this.speed = 1;
     /**
      * @read only
      * 播放状态
      */
     this.playing = false;
     /**
      * @read only
      * 正在播放的帧索引(第一帧从0开始)
      */
     this.currentFrameIndex = 0;
     /**
      * @read only
      * 正在播放的帧对象
      */
     this.currentFrame = null;
     /**
      * @private
      * 当前帧已播放次数
      */
     this.currentPlayTimes = 0;
     //在Animation内部自定义这样，是为了让对象自控制自己的帧变换，间接影响这个数值快慢就是刷新canvas速率的快慢
     /**
      * 多少次界面刷新更换一帧
      */
     this.maxPlayTimes = 4;

   }



   /**
    * 初始化
    */
   Animation.prototype.init = function (imageName, getFrameMethod, framesName) {
     this.img = my.ImageManager.get(imageName);
     this.frames = getFrameMethod(framesName);
     this.currentFrameIndex = 0;
     this.currentFrame = this.frames[this.currentFrameIndex];
     this.currentFramePlayed = 0;
   }

   /**
    * normal状态更新
    */
   Animation.prototype.update = function () {
     if (this.currentPlayTimes >= this.maxPlayTimes) {
       if (this.currentFrameIndex >= this.frames.length - 2) {
         this.currentFrameIndex = 0;
       } else {
         this.currentFrameIndex++;
       }
       this.currentFrame = this.frames[this.currentFrameIndex];
       this.currentPlayTimes = 0;
     } else {
       this.currentPlayTimes++;
     }
   }

   Animation.prototype.draw = function (ct, x, y, w, h) {
     var f = this.currentFrame; // 当前帧的x,y，即改变雪碧图的切割位置
     ct.drawImage(this.img, f.x, f.y, w, h, x, y, w, h);
   }
   my.Animation = Animation;
 })();