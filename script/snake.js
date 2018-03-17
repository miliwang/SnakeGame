// 分析蛇对象需要的哪些属性

//宽 高 背景色 坐标 放置位置 运动方向

define(function(){
    
    //定义变量elements用于保存蛇身体的各个部分
    var elements = [];

    /**
     * 声明构造函数——用于创建蛇的实例对象
     * @param options 对于创建的蛇的实例，需要进行设置的相关属性，必选。
     * 食物的属性：width（宽度），height(高度),map(蛇显示的位置)，direction(运动方向)
     */
    function Snake(options) {
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.map = options.map;

        //因为蛇的身体由多个部分组成并且每个部分会有多个属性，使用复杂结构存储
        //设置身体在地图上的初始位置
        this.body = [
            { x: 3, y: 1, color: "#ff66ff" }, //头部
            { x: 2, y: 1, color: "pink" }, //身体1
            { x: 1, y: 1, color: "pink" } //身体2
        ];

        //设置蛇的运动方向
        this.direction = options.direction || "right";
    }


    /**
     * 构造函数原型添加方法——元素（蛇）初始化（创建元素（蛇））
     */
    Snake.prototype.init = function() {

        //每次重新画蛇时，需要将上一次
        removeSnake();

        var body;

        for (var i = 0; i < this.body.length; i++) {
            body = this.body[i];

            var item = document.createElement("div");

            item.style.width = this.width + "px";
            item.style.height = this.height + "px";

            item.style.backgroundColor = body.color;

            item.style.left = body.x * this.width + "px";
            item.style.top = body.y * this.height + "px";

            item.className = 'item';
            elements.push(item);
            this.map.appendChild(item);

        }

    }

    Snake.prototype.move = function() {

        for (var i = this.body.length - 1, body; i > 0; i--) {
            body = this.body[i];
            body.x = this.body[i - 1].x;
            body.y = this.body[i - 1].y;
        }

        switch (this.direction) {
            case "left":
                this.body[0].x--;
                break;
            case "right":
                this.body[0].x++;
            break;
            case "up":
                this.body[0].y--;
                break;
            case "down":
                this.body[0].y++;
                break;
        }

        // this.init();
    }

    function removeSnake() {
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }

        elements = [];
    }

    // window.Snake = Snake;
    return Snake;
});