// Class MouseManager:
//    Get coordinates x,y from mouse and perform callback when clic or touch.

MouseManager.self = null;

function MouseManager()
{
	MouseManager.self = this;

	MouseManager.prototype.initDefault = function() 
	{
		msglog('INIT MOUSE:initDefault');
		
		MouseManager.self = this;

		this.m_canvasEx = null;
		this.m_soundManager = null;
		
		this.m_mousePosX = 0;
		this.m_mousePosY = 0;

		this.m_mouseClick = false;

		this.m_managerAvailable = false;

		this.m_eventListenersAdded = false;

		this.m_clicDown = false;

		this.m_touchStopMouse = false;
	};

	MouseManager.prototype.initWithCanvasAndSound = function (_canvasEx, _soundManager)
	{
		msglog('INIT MOUSE:initWithCanvasAndSound');

		MouseManager.self = this;
		
		this.initDefault();

		this.m_canvasEx = _canvasEx;
		this.m_soundManager = _soundManager;
		
		if (this.m_eventListenersAdded === false)
		{
			this.m_canvasEx.m_canvas.addEventListener("mousedown", this.mouseDown, false);
			this.m_canvasEx.m_canvas.addEventListener("mousemove", this.mouseXY, false);
			this.m_canvasEx.m_canvas.addEventListener("mouseup", this.mouseUp, false);
			
			this.m_canvasEx.m_canvas.addEventListener("touchstart", this.touchDown, false);
			this.m_canvasEx.m_canvas.addEventListener("touchmove", this.touchXY, false);
			this.m_canvasEx.m_canvas.addEventListener("touchend", this.touchUp, false);

			this.m_eventListenersAdded = true;
		}
	};

	MouseManager.prototype.mouseDown = function(e)
	{
		msglog("MouseManager.mouseDown:" + MouseManager.self.m_touchStopMouse);
		e = e || window.event;
		
		if (MouseManager.self.m_touchStopMouse === false)
		{
			MouseManager.self.m_mouseClick = true;
			MouseManager.self.showPos();
		}
	};

	MouseManager.prototype.mouseUp = function(e)
	{
		msglog("MouseManager.mouseUp:" + MouseManager.self.m_touchStopMouse);
		e = e || window.event;
		
		if (MouseManager.self.m_touchStopMouse === false)
		{
			MouseManager.self.m_mouseClick = false;
			MouseManager.self.showPos();
		}
	};

	MouseManager.prototype.mouseXY = function(e)
	{	
		msglog("MouseManager.mouseXY:" + MouseManager.self.m_touchStopMouse);
		if (MouseManager.self.m_touchStopMouse === true)
		{
			return;
		}

        e = e || window.event;

        MouseManager.self.m_mousePosX = e.clientX - MouseManager.self.m_canvasEx.m_canvasOffsetX;
        MouseManager.self.m_mousePosY = e.clientY - MouseManager.self.m_canvasEx.m_canvasOffsetY;

		if ((typeof MouseManager.self.m_canvasEx.m_scaleX !== 'undefined') && 
			MouseManager.self.m_canvasEx.m_scaleX !== null && 
			MouseManager.self.m_canvasEx.m_scaleX != 0)
		{
			MouseManager.self.m_mousePosX = MouseManager.self.m_mousePosX / MouseManager.self.m_canvasEx.m_scaleX;
		}

		if ((typeof MouseManager.self.m_canvasEx.m_scaleY !== 'undefined') && 
			MouseManager.self.m_canvasEx.m_scaleY !== null && 
			MouseManager.self.m_canvasEx.m_scaleY != 0)
		{
			MouseManager.self.m_mousePosY = MouseManager.self.m_mousePosY / MouseManager.self.m_canvasEx.m_scaleY;
		}

		MouseManager.self.showPos();
	};

	MouseManager.prototype.touchDown = function(e)
	{
		msglog("MouseManager.touchDown");
		
		MouseManager.self.m_touchStopMouse = true;

		if ((typeof e !== 'undefined'))
			e = e || window.event;
			
		MouseManager.self.m_mouseClick = true;
		MouseManager.self.touchXY(e);
		MouseManager.self.showPos();
	};

	MouseManager.prototype.touchUp = function(e)
	{
		msglog("MouseManager.touchUp");
		
		if ((typeof e !== 'undefined'))
			e = e || window.event;
		
		MouseManager.self.m_mouseClick = false;
		MouseManager.self.touchXY(e);
		MouseManager.self.showPos();
	};

	MouseManager.prototype.touchXY = function(e)
	{
		msglog("MouseManager.touchXY");
		if ((typeof e !== 'undefined'))
			e = e || window.event;

		if ((typeof e.targetTouches[0] !== 'undefined') && (typeof e.targetTouches[0] !== 'undefined'))
		{
			mx = e.targetTouches[0].clientX;
			my = e.targetTouches[0].clientY;
			MouseManager.self.m_mousePosX = e.targetTouches[0].clientX - MouseManager.self.m_canvasEx.m_canvasOffsetX;
			MouseManager.self.m_mousePosY = e.targetTouches[0].clientY - MouseManager.self.m_canvasEx.m_canvasOffsetY;
			
		}
		else if ((typeof e.changedTouches[0] !== 'undefined') && (typeof e.changedTouches[0] !== 'undefined'))
		{
			mx = e.changedTouches[0].clientX;
			my = e.changedTouches[0].clientY;
			MouseManager.self.m_mousePosX = e.changedTouches[0].clientX - MouseManager.self.m_canvasEx.m_canvasOffsetX;
			MouseManager.self.m_mousePosY = e.changedTouches[0].clientY - MouseManager.self.m_canvasEx.m_canvasOffsetY;
		}

		if ((typeof MouseManager.self.m_canvasEx.m_scaleX !== 'undefined') && 
			MouseManager.self.m_canvasEx.m_scaleX !== null && MouseManager.self.m_canvasEx.m_scaleX != 0)
		{
			MouseManager.self.m_mousePosX = MouseManager.self.m_mousePosX / MouseManager.self.m_canvasEx.m_scaleX;
		}

		if ((typeof MouseManager.self.m_canvasEx.m_scaleY !== 'undefined') && 
			MouseManager.self.m_canvasEx.m_scaleY !== null && MouseManager.self.m_canvasEx.m_scaleY != 0)
		{
			MouseManager.self.m_mousePosY = MouseManager.self.m_mousePosY / MouseManager.self.m_canvasEx.m_scaleY;
		}

		MouseManager.self.showPos();
	};

	MouseManager.prototype.showPos = function ()
	{
		var str = "showpos:" + MouseManager.self.m_mousePosX + ", " + MouseManager.self.m_mousePosY;

		if (MouseManager.self.m_mouseClick)
			str += " down";
		else 
			str += " up";

		var strSC = "  scale:" + MouseManager.self.m_canvasEx.m_scaleX + ", " + MouseManager.self.m_canvasEx.m_scaleY;

		if (MouseManager.self.m_soundManager != null && MouseManager.self.m_soundManager.m_firstInit == false)
		{
			MouseManager.self.m_soundManager.initFirstSound();
			MouseManager.self.m_soundManager.m_firstInit = true;
		}
	};

	// In some cases we need to know if mouse change from down to up.
	// This avoid multiple push over, it is like wait until key released.
	MouseManager.prototype.triggerClic = function (_isOverControl)
	{
		var result = false;

		if (_isOverControl === true)
		{
			if (this.m_clicDown === false && this.m_mouseClick === true)
			{
				this.m_clicDown = true;
			}
			else
			{
				if (this.m_clicDown === true && this.m_mouseClick === false)
				{
					result = true;
					this.m_clicDown = false;
				}	
			}
		}
		else
		{
			this.m_clicDown = false;
		}

		return result;
	};

	this.initDefault();
}

