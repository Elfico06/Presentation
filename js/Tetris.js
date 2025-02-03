var over = false;
var stop = false;
var level = 1;
// Definir la forma cuadrada
var shapes = (
    "0,1,1,1,2,1,3,1;" +
    "1,0,1,1,1,2,2,2;" +
    "2,0,2,1,2,2,1,2;" +
    "0,1,1,1,1,2,2,2;" +
    "1,2,2,2,2,1,3,1;" +
    "1,1,2,1,1,2,2,2;" +
    "0,2,1,2,1,1,2,2").split(";");
var nextShape = null;

function create(tag, css) {
    var elm = document.createElement(tag);
    elm.className = css;
    document.body.appendChild(elm);
    return elm;
}

function Tetris(c, t, x, y) {
    var c = c ? c : "c";
    this.divs = [create("div", c), create("div", c), create("div", c), create("div", c)];
    if ("d" != c) {
        this.nextDivs = [create("div", c), create("div", c), create("div", c), create("div", c)];
    }
    this.reset = function () {
        this.x = typeof x != 'undefined' ? x : 3;
        this.y = typeof y != 'undefined' ? y : 0;
        this.shape = t ? t : (nextShape ? nextShape : shapes[Math.floor(Math.random() * (shapes.length - 0.00001))].split(","));
        if ("d" != c) {
            nextShape = t ? t : shapes[Math.floor(Math.random() * (shapes.length - 0.00001))].split(",");
        }
        this.show();
        if (this.field && this.field.check(this.shape, this.x, this.y, 'v') == 'D') {
            over = true;
            this.field.fixShape(this.shape, this.x, this.y);
            alert('game over');
        }
    };
    this.show = function () {
        for (var i in this.divs) {
            this.divs[i].style.left = (this.shape[i * 2] * 1 + this.x) * 20 + 'px';
            this.divs[i].style.top = (this.shape[i * 2 + 1] * 1 + this.y) * 20 + 'px';
        }
        if ("d" != c) {
            for (var i in this.nextDivs) {
                this.nextDivs[i].style.left = (nextShape[i * 2] * 1 + 16) * 20 + 'px';
                this.nextDivs[i].style.top = (nextShape[i * 2 + 1] * 1 + 0) * 20 + 'px';
            }
        }
    };
    this.field = null;
    this.hMove = function (step) {
        if(stop) return;
        var r = this.field.check(this.shape, this.x - -step, this.y, 'h');
        if (r != 'N' && r == 0) {
            this.x -= -step;
            this.show();
        }
    };
    this.vMove = function () {
        if(stop) return;
        if (this.field.check(this.shape, this.x, this.y - -1, 'v') == 'N') {
            this.y++;
            this.show();
        }
        else {
            this.field.fixShape(this.shape, this.x, this.y);
            this.field.findFull();
            this.reset();
        }
    };
    this.rotate = function () {
        if(stop) return;
        var s = this.shape;
        var newShape = [3 - s[1], s[0], 3 - s[3], s[2], 3 - s[5], s[4], 3 - s[7], s[6]];
        var r = this.field.check(newShape, this.x, this.y, 'h');
        if (r == 'D') return;
        if (r == 0) {
            this.shape = newShape;
            this.show();
        }
        else if (this.field.check(newShape, this.x - r, this.y, 'h') == 0) {
            this.x -= r;
            this.shape = newShape;
            this.show();
        }
    };
    this.stop = function () {
        stop=!stop;
        if(stop){
            document.getElementById("stop").innerText=("stop");
        }else{
            document.getElementById("stop").innerText=("begin");
        }
    };
    this.reset();
}

function Field(w, h) {
    this.width = w ? w : 15;
    this.height = h ? h : 25;
    this.show = function () {
        var f = create("div", "f");
        f.style.width = this.width * 20 + 'px';
        f.style.height = this.height * 20 + 'px';
        var info = create("div", "info");
        info.style.width = 4 * 20 + 'px';
        info.style.height = 4 * 20 + 'px';
        info.style.top = 0 * 20 + 'px';
        info.style.left = (this.width + 1) * 20 + 'px';
        var scoreDiv = create("div", "info");
        scoreDiv.style.width = 4 * 20 + 'px';
        scoreDiv.style.height = 8 * 20 + 'px';
        scoreDiv.style.top = 5 * 20 + 'px';
        scoreDiv.style.left = (this.width + 1) * 20 + 'px';
        var sourceInfo = document.createElement("p");
        sourceInfo.id = "sourceInfo";
        sourceInfo.innerText = "SOURCE:";
        scoreDiv.appendChild(sourceInfo);
        var source = document.createElement("p");
        source.id = "source";
        source.innerText = "0";
        scoreDiv.appendChild(source);
        var level = document.createElement("p");
        level.id = "level";
        level.innerText = "level: 1";
        scoreDiv.appendChild(level);
        var stop = document.createElement("p");
        stop.id = "stop";
        stop.innerText = "begin";
        scoreDiv.appendChild(stop);
    };
    this.findFull = function () {
        var removeLineCount = 0;
        for (var l = 0; l < this.height; l++) {
            var s = 0;
            for (var i = 0; i < this.width; i++) {
                s += this[l * this.width + i] ? 1 : 0;
            }
            if (s == this.width) {
                removeLineCount++;
                this.removeLine(l);
            }
        }
        var source = parseInt(document.getElementById("source").innerText);
        switch (removeLineCount) {
            case 0:
                document.getElementById("source").innerText=(source+0);
                break;
            case 1:
                document.getElementById("source").innerText=(source+10);
                break;
            case 2:
                document.getElementById("source").innerText=(source+30);
                break;
            case 3:
                document.getElementById("source").innerText=(source+60);
                break;
            case 4:
                document.getElementById("source").innerText=(source+100);
                break;
        }
        if(source/50>=level){
            level++;
            document.getElementById("level").innerText=("level: "+level);
            clearInterval(timer);
            timer=window.setInterval("if(!over&&!stop)s.vMove();", 400/level);
        }
    };
    this.removeLine = function (line) {
        for (var i = 0; i < this.width; i++) {
            document.body.removeChild(this[line * this.width + i]);
        }
        for (var l = line; l > 0; l--) {
            for (var i = 0; i < this.width; i++) {
                this[l * this.width - -i] = this[(l - 1) * this.width - -i];
                if (this[l * this.width - -i]) this[l * this.width - -i].style.top = l * 20 + 'px';
            }
        }
    };
    this.check = function (shape, x, y, d) {
        var r1 = 0, r2 = 'N';
        for (var i = 0; i < 8; i += 2) {
            if (shape[i] - -x < 0 && shape[i] - -x < r1) {
                r1 = shape[i] - -x;
            }
            else if (shape[i] - -x >= this.width && shape[i] - -x > r1) {
                r1 = shape[i] - -x;
            }
            if (shape[i + 1] - -y >= this.height || this[shape[i] - -x - -(shape[i + 1] - -y) * this.width]) {
                r2 = 'D'
            }
        }
        if (d == 'h' && r2 == 'N') return
            if (d == 'h' && r2 == 'N') return r1 > 0 ? r1 - this.width - -1 : r1;
            else return r2;
        };
        this.fixShape = function (shape, x, y) {
            var d = new Tetris("d", shape, x, y);
            d.show();
            for (var i = 0; i < 8; i += 2) {
                this[shape[i] - -x - -(shape[i + 1] - -y) * this.width] = d.divs[i / 2];
            }
        };
    }
    
    var f = new Field();
    f.show();
    
    var s = new Tetris();
    s.field = f;
    s.show();
    
    var timer = window.setInterval("if(!over&&!stop)s.vMove();", 500);
    
    document.onkeydown = function (e) {
        if (over) return;
        var e = window.event ? window.event : e;
        switch (e.keyCode) {
            case 38: //up
                s.rotate();
                break;
            case 40: //down
                s.vMove();
                break;
            case 37: //left
                s.hMove(-1);
                break;
            case 39: //right
                s.hMove(1);
                break;
            case 27: // ESC pausa, inicio
                s.stop();
                break;
        }
    };
    
    // Añadir eventos táctiles
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);
    
    var xDown = null;
    var yDown = null;
    
    function handleTouchStart(evt) {
        const firstTouch = evt.touches[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };
    
    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }
    
        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;
    
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
    
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                // Mover a la izquierda
                s.hMove(-1);
            } else {
                // Mover a la derecha
                s.hMove(1);
            }
        } else {
            if (yDiff > 0) {
                // Rotar
                s.rotate();
            } else {
                // Mover hacia abajo
                s.vMove();
            }
        }
        xDown = null;
        yDown = null;
    };
    
    function handleTouchEnd(evt) {
        xDown = null;
        yDown = null;
    };
