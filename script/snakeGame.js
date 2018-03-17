/**
 * 贪吃蛇相关js处理
 * @param Food 创建食物并设置随机横纵坐标（显示位置）
 * @param Snake 创建贪吃蛇主体，并设置移动方法
 * @param Game 创建游戏主体，在进行Snake 和 Food进行设置调用
 */


var map = document.getElementById("map"); //地图（整个游戏环境的面板）
var btn = document.getElementsByClassName("btn")[0];
var timer=null;

function randomColor() {
    return "rgba(" + Math.round(Math.random() * 225) + "," + Math.round(Math.random() * 225) + "," + Math.round(Math.random() * 225) + ",.8)";
}
//声明食物自调用函数
(function(window, document) {
    /**
     * 声明构造函数——用于创建食物的实例对象
     * @param options 对于创建的食物实例，需要进行设置的相关属性，必选。
     * 食物的属性：width（宽度），height(高度)，bgColor(背景颜色),map(食物存放的位置)
     */
    function Food(options) {
        this.width = options.width || 20; //元素（食物）宽度
        this.height = options.height || 20; //元素（食物）高度
        this.bgColor = options.bgColor || randomColor(); //元素（食物）宽度
        this.map = options.map;
        this.x = 0; //横坐标
        this.y = 0; //纵坐标
        //创建element属性，存放当前生成的食物（便于删除以及设置定位时使用）
        this.element = null;
    }

    /**
     * 构造函数原型添加方法——元素（食物）初始化（创建元素（食物））
     */
    Food.prototype.init = function() {

        //判断当前实例对象中是否已经存在元素（食物）
        if (this.element) {
            // 满足条件时，清除当前元素（食物实例）
            this.map.removeChild(this.element);
        }

        // 创建元素（食物）
        var fbox = document.createElement('div');

        // 将创建的元素（食物）保存在实例对象element属性中
        this.element = fbox;
        // 对初始化的元素（食物）进行样式属性设置
        fbox.style.width = this.width + "px";
        fbox.style.height = this.height + "px";
        fbox.style.backgroundColor = this.bgColor;
        fbox.style.position = "absolute";

        //将元素（食物）追加到面板（地图）中
        this.map.appendChild(fbox);

        //设置元素（食物）横纵坐标（位置）调用
        //宽度、高度最大值
        var wtotal = this.map.offsetWidth / this.width,
            htotal = this.map.offsetHeight / this.height;

        //横、纵坐标
        this.x = Math.floor(Math.random() * wtotal);
        this.y = Math.floor(Math.random() * htotal);

        //设置左偏移与上偏移
        this.element.style.left = this.x * this.width + "px";
        this.element.style.top = this.y * this.height + "px";
    }

    //将局部函数Food保存在window属性Food中，供外部函数使用
    window.Food = Food;
})(window, document);


//声明贪吃蛇自调用函数
(function() {
    // 创建elements数组变量，存放蛇身体的每一部分
    var elements = [];
    /**
     * 声明构造函数——用于创建蛇身体的实例对象
     * @param options 对于创建的蛇身体实例，需要进行设置的相关属性，必选。
     * 蛇的属性：width（宽度），height(高度),map(蛇放的位置)，direction(移动方向)
     */
    function Snake(options) {
        this.height = options.height || 20; //身体的一个部分的高度
        this.width = options.width || 20; //身体的一个部分的宽度
        this.map = options.map; //地图(面板)
        this.direction = options.direction || "right"; //移动的方向（默认为向右）
        this.body = [
            { x: 3, y: 2, color: "red" }, //头部
            { x: 2, y: 2, color: "pink" }, //身体1
            { x: 1, y: 2, color: "pink" } //身体2
        ];
    }
    /**
     * 构造函数原型添加方法——给元素（蛇）初始化（创建蛇）
     */
    Snake.prototype.init = function() {

        //每次初始化前需要先将之前的蛇移除掉
        removeSnake();
        var body = this.body;
        //蛇身体
        for (var i = 0; i < body.length; i++) {
            //创建蛇的每一部分
            var item = document.createElement("div");
            //设置蛇的每一部分的高 
            item.style.height = this.height + "px";
            //设置蛇的每一部分的宽
            item.style.width = this.width + "px";
            //设置蛇的每一部分左偏移的位置
            item.style.left = this.width * body[i].x + "px";
            //设置蛇的每一部分右偏移的位置
            item.style.top = this.height * body[i].y + "px";
            //设置蛇的每一部分的背景色
            item.style.backgroundColor = body[i].color;
            //设置蛇的每一部分的统一类名（设置定位）
            item.className = "item";
            //将蛇身体的每一部分追加到地图中（面板中）
            this.map.appendChild(item);
            //将蛇的每一部分保存到变量elements数组中（用于之后的删除操作）
            elements.push(item);
        }

    }

    /** 
     * 构造函数原型添加方法——给元素（蛇）设置移动
     */
    Snake.prototype.move = function(food, map) {
        var body = this.body;
        for (var i = body.length -1; i > 0; i--) {
            body[i].x = body[i - 1].x;
            body[i].y = body[i - 1].y;
        }

        switch (this.direction) {
            case "left":
                body[0].x--;
                break;
            case "right":
                body[0].x++;
                break;
            case "up":
                body[0].y--;
                break;
            case "down":
                body[0].y++;
                break;
        }
    }

    //声明函数——删除蛇（初始化）
    function removeSnake() {
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
            // elements.shift();
        }
        //当将地图（面板）中的蛇身体的所有部分删除时，要将保存蛇身体的变量elements将值更改为空。（不影响下次删除）
        elements = [];
    }
    window.Snake = Snake;
})();

(function(window, document) {
    function Game(options) {
        this.map = options.map;
    }

    var snake = new Snake({ map: map });
    var food = new Food({ map: map });
    // var map = null;


    Game.prototype.start = function() {
        food.init();
        snake.init();
        this.snakeRun();
        onKeyClicked();
    }


    function onKeyClicked() {
        document.onkeydown = function(e) {
            var event = e || window.event;
            var code = event.keyCode;

            switch (true) {
                case code == 37 && snake.direction != "right":
                    snake.direction = 'left';
                    break;
                case code == 38 && snake.direction != "down":
                    snake.direction = 'up';
                    break;
                case code == 39 && snake.direction != "left":
                    snake.direction = 'right';
                    break;
                case code == 40 && snake.direction != "up":
                    snake.direction = 'down';
                    break;
            }
        }
    }

    Game.prototype.snakeRun =function() {

        clearInterval(timer);

        timer = setInterval(function() {

            var sbody = snake.body;
            var lastX = sbody[sbody.length - 1].x;
            var lastY = sbody[sbody.length - 1].y;
            snake.move();

            if (sbody[0].x == food.x && sbody[0].y == food.y) {
                sbody.push({ x: lastX, y: lastY, 'color': 'pink' });
                food.init();
            }
            var maxX = this.map.offsetWidth / snake.width -1;
            var maxY = this.map.offsetHeight / snake.height -1;
            if (maxX < sbody[0].x || maxY < sbody[0].y || sbody[0].x < 0 || sbody[0].y < 0) {
                alert("撞到墙壁啦，Game over!");
                clearInterval(timer);
                return false;

            }

            for (var i = 4; i < sbody.length; i++) {
                //当移动后检测蛇头部是否与身体的某一部分重合，若横纵坐标均相等，则提示错误
                if (sbody[i].x == sbody[0].x && sbody[i].y == sbody[0].y) {
                    alert("撞到自己啦，Game over!");
                    clearInterval(timer);
                    return false;
                }
            }
            snake.init();
        }, 200);
    }
    window.Game = Game;
})(window, document);


var game = new Game({
    "map": map
});

game.start();

btn.onclick = function(event){
    var event = event || window.event;
    var btnTxt = btn.innerText;

    if(btnTxt == "暂停"){
        btn.innerText = "开始";
        clearInterval(timer);
    }else{
        btn.innerText = "暂停";
        game.snakeRun();
    }

}