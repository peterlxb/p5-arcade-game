// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    // 虫子要以不同的速度移动,所以需要添加一个speed属性
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random()*100);
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if(this.x >= 505) {
      this.x = 22;
    }
    this.x = this.x + this.speed * dt;
    //console.log(this.x, this.y)

};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function(){

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x,y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};
var PLAYER_START_X = 404

Player.prototype.update = function(){

  if(this.y < 0) {
    alert("wins");
    this.x = 200;
    this.y = 404;
  }

};

Player.prototype.checkCollisions = function() {

  for(var i = 0; i < allEnemies.length; i++) {
    if(this.y === allEnemies[i].y) {
      if((Math.abs(this.x - allEnemies[i].x)) < 65) {
        this.x = 200;
        this.y = 404;
      }
    }
  }
};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
};

Player.prototype.canMoveLeft = function(){
  return this.x > 0 ;
}
Player.prototype.canMoveRight = function(){
  return this.x < 402 ;
}
Player.prototype.canMoveUp = function(){
  return this.y > 52 ;
}
Player.prototype.canMoveDown = function(){
  return this.y < 350 ;
}

Player.prototype.handleInput = function(movement) {
  switch(movement){
    case 'left': if(player.canMoveLeft()) this.x -= 101;break;
    case 'right':if(player.canMoveRight()) this.x += 101;break;
    case 'up': if(player.canMoveUp()) this.y -= 83;break;
    case 'down': if(player.canMoveDown()) this.y += 83;break;
}

};
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面


var allEnemies = [
   new Enemy(22, 83 * 0 + 72), new Enemy(21, 83 * 0 + 72),
   new Enemy(22, 83 * 1 + 72), new Enemy(21, 83 * 1 + 72),
   new Enemy(22, 83 * 2 + 72), new Enemy(21, 83 * 2 + 72),
];

var player = new Player(200, 404);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
