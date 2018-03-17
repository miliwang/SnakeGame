/**
 * 贪吃蛇相关js处理
 * @param Food 创建食物并设置随机横纵坐标（显示位置）
 * @param Snake 创建贪吃蛇主体，并设置移动方法
 * @param Game 创建游戏主体，在进行Snake 和 Food进行设置调用
 */


define(function(){
        /**
     * 声明构造函数——用于创建食物的实例对象
     * @param options 对于创建的食物实例，需要进行设置的相关属性，必选。
     * 食物的属性：width（宽度），height(高度)，bgColor(背景颜色),map(食物存放的位置)
     */
    function Food(options) {
        this.width = options.width || 20; //元素（食物）宽度
        this.height = options.height || 20; //元素（食物）高度
        this.bgColor = options.bgColor || "pink"; //元素（食物）宽度
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
        this.setRandomPos();
    }

    /**
     * 构造函数原型添加方法——给元素（食物）设置随机坐标位置
     */
    Food.prototype.setRandomPos = function() {
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
    // window.Food = Food;
    return Food;
});