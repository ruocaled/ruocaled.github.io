"use strict";angular.module("clashApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngTouch","ngAnimate"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("clashApp").factory("Squad",["Tank","Spear","Healer","Archer","Dead","$timeout",function(a,b,c,d,e){function f(a,b){this.w=a,this.h=b,this.list=[],this.init()}var g=[a,b,c,d];return f.prototype.init=function(){var a=this.w,b=this.h;if(this.w&&this.h)for(var c=0;a>c;c++){for(var d=[],e=0;b>e;e++){var f=new(g[Math.floor(4*Math.random())]);f.x=c,f.y=e,d[e]=f}this.list[c]=d}},f.prototype.getSoldierByPos=function(a,b){return this.list[a]&&this.list[a][b]?this.list[a][b]:!1},f.prototype.getMatrix=function(){return this.list},f.prototype.swap=function(a,b){function c(a,b){var c=Math.abs(a.x-b.x),d=Math.abs(a.y-b.y);return 1!==c&&1!==d||c+d===2?!1:b instanceof e&&b.x>a.x||a instanceof e&&a.x>b.x?!1:!0}if(c(a,b)){var d=this.list;d[a.x][a.y]=b,d[b.x][b.y]=a;var f=a.x,g=a.y;return a.x=b.x,a.y=b.y,b.x=f,b.y=g,!0}return!1},f}]),angular.module("clashApp").controller("MainCtrl",["$scope","Squad","Dead","Spear","Healer","Tank","Archer","$timeout",function(a,b,c,d,e,f,g,h){var i=new Audio("sounds/click.mp3"),j=null,k=null,l=[],m=[d,e,f,g],n=7,o=4,p=new b(o,n),q=new b(o,n);a.totalNumSoldiers=n*o,a.gameOver=!1,a.turn=0,a.movesLeft=10,a.MAXMOVESLEFT=a.movesLeft,a.score=0,a.combo=0,a.highScore=parseInt(localStorage.clashHightScore||0),a.enemyMatrix=p.getMatrix(),a.matrix=q.getMatrix(),a.resetGame=function(){i.play(),j=null,k=null,l=[],p=new b(o,n),q=new b(o,n),a.totalNumSoldiers=n*o,a.gameOver=!1,a.turn=0,a.movesLeft=10,a.MAXMOVESLEFT=a.movesLeft,a.score=0,a.enemyMatrix=p.getMatrix(),a.matrix=q.getMatrix()},a.range=function(a){return new Array(a)},a.displayClass={selected:function(a){return a===j?"selected":""},highlighted:function(a){return-1!==l.indexOf(a)?"highlighted":""},clashAnimation:function(b){return a.clashAnimationOn?"up"===b?"bendup":"left"===b?"hideleft":"benddown":""},deathAnimation:function(a){return a.health<0&&a instanceof c!=!0?"killed":""},getGemClass:function(b){return b>=a.movesLeft?"gem-empty":"gem-full"}},a.clearRangesHighlight=function(){l=[]},a.showInRanges=function(b,c){var d,f,g=c.x,h=c.y;b?(d=a.matrix,f=a.enemyMatrix):(d=a.enemyMatrix,f=a.matrix),c instanceof e?(d[g-1]&&d[g-1][h]&&l.push(d[g-1][h]),d[g+1]&&d[g+1][h]&&l.push(d[g+1][h]),d[g]&&d[g][h-1]&&l.push(d[g][h-1]),d[g]&&d[g][h+1]&&l.push(d[g][h+1])):f[c.attackRange-1-g]&&f[c.attackRange-1-g][h]&&l.push(f[c.attackRange-1-g][h])},a.getAbsPos=function(a,b){var c={},d=100;return a?c.bottom=60*b.x+"px":c.top=60*b.x+"px",c.left=60*b.y+d+"px",c},a.awesomeThings=[q.w,"AngularJS","Karma"],a.runClashAnimation=function(){a.clashAnimationOn=!0,h(function(){a.clashAnimationOn=!1},1500)},a.clash=function(){function b(){function b(a,b){if(a&&"dead"!==a.className){var d=a.x,e=a.y;b[d-1]&&b[d-1][e]&&c(b[d-1][e]),b[d+1]&&b[d+1][e]&&c(b[d+1][e]),b[d]&&b[d][e-1]&&c(b[d][e-1]),b[d]&&b[d][e+1]&&c(b[d][e+1])}}function c(a){var b=(a.health,a.health+1);a.health=Math.min(b,a.MAXHEALTH)}for(var d=a.matrix,e=a.enemyMatrix,f=0;o>f;f++)for(var g=0;n>g;g++){var h=d[f][g],i=e[f][g];h&&"healer"===h.className&&b(h,d),i&&"healer"===i.className&&b(i,e)}}function d(){for(var b=a.matrix,d=a.enemyMatrix,e=0;2>e;e++)for(var f=0;n>f;f++){var g=b[e][f],h=d[e][f];if(g){if("dead"===g.className)continue;if(0===e)if(1===g.attackRange)g&&h&&(1===h.attackRange&&(g.health-=h.attack),h instanceof c!=!0&&(h.health-=g.attack));else{if(g&&h&&(g.health-=h.attack),g){var i=g.attackRange-1-g.x;if(d[i]){var j=d[i][g.y];j&&j instanceof c!=!0&&(j.health-=g.attack)}}if(h){var i=h.attackRange-1-h.x;if(b[i]){var j=b[i][h.y];j&&j instanceof c!=!0&&(j.health-=h.attack)}}}else{if(g.attackRange>g.x){var i=g.attackRange-1-g.x;if(d[i]){var j=d[i][g.y];j&&j instanceof c!=!0&&(j.health-=g.attack)}}if(h.attackRange>h.x){var i=h.attackRange-1-h.x;if(b[i]){var j=b[i][h.y];j&&j instanceof c!=!0&&(j.health-=h.attack)}}}}}}function e(){function b(a,b,d){var e=a[b][d];e&&e.health<1&&e instanceof c!=!0&&(a[b][d]=void 0),e instanceof c==!0&&a[b+1]&&a[b+1][d]&&a[b+1][d]instanceof c!=!0&&(a[b][d]=void 0)}function d(b,d,e,f,g){var h=b[d][e];if(!h){for(;b[d+1]&&b[d+1][e]&&b[d+1][e]instanceof c!=!0;)b[d][e]=b[d+1][e],b[d][e].x=d,b[d][e].y=e,d+=1;if(g){a.score++,a.combo++;var i=new(m[Math.floor(4*Math.random())]);i.x=d,i.y=e,b[d][e]=i,a.highScore<a.score&&(localStorage.clashHightScore=a.score,a.highScore=a.score)}else b[d][e]=new c,b[d][e].x=d,b[d][e].y=e,a.totalNumSoldiers--,a.totalNumSoldiers<=0&&(a.gameOver=!0)}}for(var e=a.matrix,f=a.enemyMatrix,g=0;2>g;g++)for(var h=0;n>h;h++)b(e,g,h,q),b(f,g,h,p);for(var g=0;2>g;g++)for(var h=0;n>h;h++)d(e,g,h,q,!1),d(f,g,h,p,!0)}i.play(),j=null,k=null,a.runClashAnimation(),h(function(){b(),d()},900),h(function(){e(),e(),a.score+=parseInt(Math.pow(2.3,a.combo)-1),a.combo=0},1500),a.turn++,a.movesLeft=10},a.reportPos=function(a){i.play()},a.go=function(b){i.play(),a.movesLeft>0&&(j?j===b?j=null:k=b:j=b,k&&(q.swap(j,k)?(j=null,k=null,a.movesLeft--):(j=k,k=null)))}}]),angular.module("clashApp").factory("Soldier",function(){function a(){this.moved=!1,this.x,this.y}return a.prototype.attack=function(){this.moved=!0},a.prototype.swap=function(){this.moved=!0},a}),angular.module("clashApp").factory("Tank",["Soldier",function(a){function b(){a.call(this),this.className="tank",this.health=8,this.MAXHEALTH=this.health,this.attackRange=1,this.attack=2}return b.prototype=new a,b}]),angular.module("clashApp").factory("Archer",["Soldier",function(a){function b(){a.call(this),this.className="archer",this.health=2,this.MAXHEALTH=this.health,this.attackRange=2,this.attack=4}return b.prototype=new a,b}]),angular.module("clashApp").factory("Healer",["Soldier",function(a){function b(){a.call(this),this.className="healer",this.health=2,this.MAXHEALTH=this.health,this.attackRange=1,this.attack=2}return b.prototype=new a,b}]),angular.module("clashApp").factory("Spear",["Soldier",function(a){function b(){a.call(this),this.className="spear",this.health=4,this.MAXHEALTH=this.health,this.attackRange=1,this.attack=3}return b.prototype=new a,b}]),angular.module("clashApp").factory("Game",["Squad",function(){function a(){this.state="idel",this.moves=10,this.turn=0,this.selected=null,this.targeted=null}return a.prototype.clash=function(){this.nextTurn()},a.prototype.nextTurn=function(){this.turn++,this.moves=10},a}]),angular.module("clashApp").factory("Dead",["Soldier",function(a){function b(){a.call(this),this.className="dead",this.health=0,this.MAXHEALTH=this.health,this.attackRange=0,this.attack=0}return b.prototype=new a,b}]);