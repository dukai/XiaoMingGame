CharModel = {
	statusUpdate: function(){
		
	},
	changeStatus: function(status){
		this.status.exit(this);
		this.status = status;
		this.status.enter(this);
	},
	
	showMoveRange: function(){}
}


var Status = function(){
	this._initStatus();
};

Status.prototype = {
	_initStatus: function(){},
	enter: function(target){},
	execute: function(target){},
	exit: function(target){}
};


var StatusNormal = function(){
	this._initStatusNormal();
};
StatusNormal.prototype = {
	_initStatusNormal: function(){},
	enter: function(target){},
	execute: function(target, event){
		if(event.coordinate.x == target.cx && event.coordinate.y == target.cy){
			target.changeStatus(new StatusActive());
		}
	},
	exit: function(target){}
};

oo.extends(StatusNormal, Status);


var StatusActive = function(){
	this._initStatusActive();
};
StatusActive.prototype = {
	_initStatusActive: function(){},
	enter: function(target){
		//show move range
		target.showMoveRange();
	},
	execute: function(target, event){
		//如果点击的是移动范围
		//进入移动模式
		if(event.coordinate.x == target.cx && event.coordinate.y == target.cy){
			target.changeStatus(new StatusMoved);
		}
		
		if(target.isInMoveRange(event.coordinate.x, event.coordinate.y)){
			activedChar.setCoordinate(event.coordinate.x, event.coordinate.y);
			target.changeStatus(new StatusMoved);
		}
		
		target.changeStatus(new StatusNormal());
		
	},
	exit: function(target){
		//hide move range
		target.hideMoveRange();
	}
};

oo.extends(StatusActive, Status);

var StatusMoved = function(){
	this._initStatusMoved();
};
StatusMoved.prototype = {
	_initStatusMoved: function(){},
	enter: function(target){
		//TODO:显示菜单
	},
	execute: function(target, event){
		//攻击，进入攻击状态
		//待机，进入待机状态
		//取消，进入正常状态
	},
	exit: function(target){}
};

oo.extends(StatusMoved, Status);

var StatusAttack = function(){
	this._initStatusMoved();
};
StatusAttack.prototype = {
	_initStatusAttack: function(){},
	enter: function(target){
	},
	execute: function(target, event){
	},
	exit: function(target){}
};

oo.extends(StatusAttack, Status);

var StatusWaiting = function(){
	this._initStatusMoved();
};
StatusWaiting.prototype = {
	_initStatusWaiting: function(){},
	enter: function(target){
	},
	execute: function(target, event){
	},
	exit: function(target){}
};

oo.extends(StatusWaiting, Status);