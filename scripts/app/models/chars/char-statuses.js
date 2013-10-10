define(function(require, exports, module){
	var CharEvent = require('app/models/chars/char-event');
	var oo = require('xiaoming/oo');
	/**
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
	*/


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

	oo.extend(StatusNormal, Status);
	exports.StatusNormal = StatusNormal;

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
				target.setCoordinate(event.coordinate.x, event.coordinate.y);
				target.changeStatus(new StatusMoved);
			}

			target.changeStatus(new StatusNormal());
			return true;

		},
		exit: function(target){
			//hide move range
			target.hideMoveRange();
		}
	};

	oo.extend(StatusActive, Status);
	exports.StatusActive = StatusActive;
	var StatusMoved = function(){
		this._initStatusMoved();
	};
	StatusMoved.prototype = {
		_initStatusMoved: function(){},
		enter: function(target){
			//TODO:显示菜单
			target.showMenu();
		},
		execute: function(target, event){
			switch (event.action){
				case "attack":
					target.changeStatus(new StatusAttack);
					break;
				case "waiting":
					target.changeStatus(new StatusWaiting());
					return true;
					break;
				case "cancel":
					target.changeStatus(new StatusNormal());
					return true;
					break;
				default :
					target.changeStatus(new StatusNormal());
					return true;
					break;
			}
		},
		exit: function(target){
			//TODO:隐藏菜单
			target.hideMenu();
		}
	};

	oo.extend(StatusMoved, Status);
	exports.StatusMoved = StatusMoved;

	var StatusAttack = function(){
		this._initStatusMoved();
	};
	StatusAttack.prototype = {
		_initStatusAttack: function(){},
		enter: function(target){
		},
		execute: function(target, event){
			target.attack(event.otherChar);
			target.changeStatus(new StatusWaiting);
			return true;
		},
		exit: function(target){}
	};

	oo.extend(StatusAttack, Status);
	exports.StatusAttack = StatusAttack;

	var StatusWaiting = function(){
		this._initStatusMoved();
	};
	StatusWaiting.prototype = {
		_initStatusWaiting: function(){},
		enter: function(target){
			//TODO: 进入等待状态
			target.eventManager.trigger(CharEvent.STATUS_WAITING, {});
		},
		execute: function(target, event){
			//切换到正常状态
			target.changeStatus(new StatusNormal());
			return true;
		},
		exit: function(target){}
	};

	oo.extend(StatusWaiting, Status);
	exports.StatusWaiting = StatusWaiting;
});

