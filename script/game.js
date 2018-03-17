define(function() {
    var that;

    function Game(options) {
        this.snake = options.snake;
        this.food = options.food;
        this.map = options.map;
        that = this;
    }

    Game.prototype.start = function() {

        this.snake.init();
        this.food.init();

        this.snakeRun();
        this.changeDirection();
    }

    Game.prototype.snakeRun = function() {

        var timer = null;
        var snake = this.snake,
            food = this.food;
        timer = setInterval(function() {
            var sbody = snake.body;
            var lastX = snake.body[snake.body.length - 1].x;
            var lastY = snake.body[snake.body.length - 1].y;

            snake.move();

            if (sbody[0].x == food.x && sbody[0].y == food.y) {
                sbody.push({ x: lastX, y: lastY, color: 'pink' });
                food.init();
            }

            // var maxX = (sbody[0].x) * snake.width,
            //     maxY = (sbody[0].y) * snake.height;
            var maxX = that.map.offsetWidth / snake.width - 1;
            var maxY = that.map.offsetHeight / snake.height - 1;
            if (maxX < sbody[0].x || maxY < sbody[0].y || sbody[0].x < 0 || sbody[0].y < 0) {
                alert('撞到了墙壁，Game Over！');
                clearInterval(timer);
                return false;
            }

            for (var i = 4; i < sbody.length; i++) {
                if (sbody[0].x == sbody[i].x && sbody[0].y == sbody[i].y) {
                    alert('撞到了自己，Game Over！');
                    clearInterval(timer);
                    return false;
                }
            }

            snake.init();

        }, 200);
    }


    Game.prototype.changeDirection = function() {

        document.onkeydown = function(event) {
            var event = event || window.event;
            var snake = that.snake;
            var code = event.keyCode;
            switch (true) {
                case code == 37 && snake.direction != "right":
                    that.snake.direction = "left";
                    break;
                case code == 38 && snake.direction != "down":
                    that.snake.direction = "up";
                    break;
                case code == 39 && snake.direction != "left":
                    that.snake.direction = "right";
                    break;
                case code == 40 && snake.direction != "up":
                    that.snake.direction = "down";
                    break;
                default:
                    break;
            }
        }
    }
    return Game;
});