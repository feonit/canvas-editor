<a name="CanvasEditor"></a>
## CanvasEditor
**Kind**: global class  

* [CanvasEditor](#CanvasEditor)
    * [new CanvasEditor(canvas, options)](#new_CanvasEditor_new)
    * [.Point](#CanvasEditor.Point)
        * [new Point(x, y)](#new_CanvasEditor.Point_new)
    * [.Curve](#CanvasEditor.Curve)
        * [new Curve(points, radius)](#new_CanvasEditor.Curve_new)
    * [.Mediator](#CanvasEditor.Mediator)
        * [new Mediator()](#new_CanvasEditor.Mediator_new)
    * [.RegionManager](#CanvasEditor.RegionManager)
        * [new RegionManager(appInstance, canvas)](#new_CanvasEditor.RegionManager_new)
    * [.ToolsDriver](#CanvasEditor.ToolsDriver)
        * [new ToolsDriver(appInstance, canvas)](#new_CanvasEditor.ToolsDriver_new)
    * [.RegionObject](#CanvasEditor.RegionObject)
        * [new RegionObject(options)](#new_CanvasEditor.RegionObject_new)
    * [.ToolController](#CanvasEditor.ToolController)
    * [.MathFn](#CanvasEditor.MathFn)
        * [.getCircleCoordinates()](#CanvasEditor.MathFn.getCircleCoordinates)
        * [.hexToRgb()](#CanvasEditor.MathFn.hexToRgb)
        * [.hexToRgba()](#CanvasEditor.MathFn.hexToRgba)
    * [.Tool](#CanvasEditor.Tool) : <code>object</code>
        * [.DraggingTool](#CanvasEditor.Tool.DraggingTool)
            * [new DraggingTool(appInstance, canvas, searchMode)](#new_CanvasEditor.Tool.DraggingTool_new)
        * [.SelectTool](#CanvasEditor.Tool.SelectTool)
            * [new SelectTool(appInstance, canvas)](#new_CanvasEditor.Tool.SelectTool_new)
    * [.Tool](#CanvasEditor.Tool) : <code>object</code>
        * [.DraggingTool](#CanvasEditor.Tool.DraggingTool)
            * [new DraggingTool(appInstance, canvas, searchMode)](#new_CanvasEditor.Tool.DraggingTool_new)
        * [.SelectTool](#CanvasEditor.Tool.SelectTool)
            * [new SelectTool(appInstance, canvas)](#new_CanvasEditor.Tool.SelectTool_new)

<a name="new_CanvasEditor_new"></a>
### new CanvasEditor(canvas, options)
Канвас редактор


| Param | Type |
| --- | --- |
| canvas | <code>HTMLCanvasElement</code> | 
| options | <code>Object</code> | 
| options.lineColor | <code>string</code> | 
| options.lineWidth | <code>number</code> | 
| options.figureType | <code>string</code> | 

<a name="CanvasEditor.Point"></a>
### CanvasEditor.Point
**Kind**: static class of <code>[CanvasEditor](#CanvasEditor)</code>  
<a name="new_CanvasEditor.Point_new"></a>
#### new Point(x, y)
Точка


| Param | Type |
| --- | --- |
| x | <code>number</code> | 
| y | <code>number</code> | 

<a name="CanvasEditor.Curve"></a>
### CanvasEditor.Curve
**Kind**: static class of <code>[CanvasEditor](#CanvasEditor)</code>  
<a name="new_CanvasEditor.Curve_new"></a>
#### new Curve(points, radius)
Кривая линия


| Param | Type |
| --- | --- |
| points |  | 
| radius | <code>HTMLCanvasElement</code> | 

<a name="CanvasEditor.Mediator"></a>
### CanvasEditor.Mediator
**Kind**: static class of <code>[CanvasEditor](#CanvasEditor)</code>  
<a name="new_CanvasEditor.Mediator_new"></a>
#### new Mediator()
Для связи между модулями

<a name="CanvasEditor.RegionManager"></a>
### CanvasEditor.RegionManager
**Kind**: static class of <code>[CanvasEditor](#CanvasEditor)</code>  
<a name="new_CanvasEditor.RegionManager_new"></a>
#### new RegionManager(appInstance, canvas)

| Param | Type |
| --- | --- |
| appInstance |  | 
| canvas | <code>HTMLCanvasElement</code> | 

<a name="CanvasEditor.ToolsDriver"></a>
### CanvasEditor.ToolsDriver
**Kind**: static class of <code>[CanvasEditor](#CanvasEditor)</code>  
<a name="new_CanvasEditor.ToolsDriver_new"></a>
#### new ToolsDriver(appInstance, canvas)
Обеспечивает управление инструментами и получение доступа подключаемых инструментов к канвасу


| Param | Type |
| --- | --- |
| appInstance | <code>Object</code> | 
| canvas | <code>HTMLCanvasElement</code> | 

<a name="CanvasEditor.RegionObject"></a>
### CanvasEditor.RegionObject
**Kind**: static class of <code>[CanvasEditor](#CanvasEditor)</code>  
<a name="new_CanvasEditor.RegionObject_new"></a>
#### new RegionObject(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.layout | <code>HTMLCanvasElement</code> |  |
| options.coordinates | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  |
| options.color | <code>Array.&lt;number&gt;</code> |  |
| options.borderCoordinates | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  |
| options.coordinatesLine | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | — исходные координаты 1-но пиксельной фигуры |

<a name="CanvasEditor.ToolController"></a>
### CanvasEditor.ToolController
**Kind**: static class of <code>[CanvasEditor](#CanvasEditor)</code>  
<a name="CanvasEditor.MathFn"></a>
### CanvasEditor.MathFn
**Kind**: static property of <code>[CanvasEditor](#CanvasEditor)</code>  

* [.MathFn](#CanvasEditor.MathFn)
    * [.getCircleCoordinates()](#CanvasEditor.MathFn.getCircleCoordinates)
    * [.hexToRgb()](#CanvasEditor.MathFn.hexToRgb)
    * [.hexToRgba()](#CanvasEditor.MathFn.hexToRgba)

<a name="CanvasEditor.MathFn.getCircleCoordinates"></a>
#### MathFn.getCircleCoordinates()
Получить список координат для всех точек принадлежащих к окружности с заданным радиусом
Функция кеширует результат по радиусу

**Kind**: static method of <code>[MathFn](#CanvasEditor.MathFn)</code>  
<a name="CanvasEditor.MathFn.hexToRgb"></a>
#### MathFn.hexToRgb()
Переводит цвет в нужный формат

**Kind**: static method of <code>[MathFn](#CanvasEditor.MathFn)</code>  
<a name="CanvasEditor.MathFn.hexToRgba"></a>
#### MathFn.hexToRgba()
Переводит цвет в нужный формат

**Kind**: static method of <code>[MathFn](#CanvasEditor.MathFn)</code>  
<a name="CanvasEditor.Tool"></a>
### CanvasEditor.Tool : <code>object</code>
**Kind**: static namespace of <code>[CanvasEditor](#CanvasEditor)</code>  

* [.Tool](#CanvasEditor.Tool) : <code>object</code>
    * [.DraggingTool](#CanvasEditor.Tool.DraggingTool)
        * [new DraggingTool(appInstance, canvas, searchMode)](#new_CanvasEditor.Tool.DraggingTool_new)
    * [.SelectTool](#CanvasEditor.Tool.SelectTool)
        * [new SelectTool(appInstance, canvas)](#new_CanvasEditor.Tool.SelectTool_new)

<a name="CanvasEditor.Tool.DraggingTool"></a>
#### Tool.DraggingTool
**Kind**: static class of <code>[Tool](#CanvasEditor.Tool)</code>  
<a name="new_CanvasEditor.Tool.DraggingTool_new"></a>
##### new DraggingTool(appInstance, canvas, searchMode)

| Param | Type | Description |
| --- | --- | --- |
| appInstance | <code>[CanvasEditor](#CanvasEditor)</code> |  |
| canvas | <code>HTMLCanvasElement</code> | — канвас |
| searchMode |  | — Режим поиска фигуры по цвету или по слоям (COLOR_MODE or LAYER_MODE) todo |

<a name="CanvasEditor.Tool.SelectTool"></a>
#### Tool.SelectTool
**Kind**: static class of <code>[Tool](#CanvasEditor.Tool)</code>  
<a name="new_CanvasEditor.Tool.SelectTool_new"></a>
##### new SelectTool(appInstance, canvas)

| Param | Type | Description |
| --- | --- | --- |
| appInstance | <code>[CanvasEditor](#CanvasEditor)</code> |  |
| canvas | <code>HTMLCanvasElement</code> | — канвас Инструмент позволяющий избирать и удалять избранные объекты с холста |

<a name="CanvasEditor.Tool"></a>
### CanvasEditor.Tool : <code>object</code>
**Kind**: static namespace of <code>[CanvasEditor](#CanvasEditor)</code>  

* [.Tool](#CanvasEditor.Tool) : <code>object</code>
    * [.DraggingTool](#CanvasEditor.Tool.DraggingTool)
        * [new DraggingTool(appInstance, canvas, searchMode)](#new_CanvasEditor.Tool.DraggingTool_new)
    * [.SelectTool](#CanvasEditor.Tool.SelectTool)
        * [new SelectTool(appInstance, canvas)](#new_CanvasEditor.Tool.SelectTool_new)

<a name="CanvasEditor.Tool.DraggingTool"></a>
#### Tool.DraggingTool
**Kind**: static class of <code>[Tool](#CanvasEditor.Tool)</code>  
<a name="new_CanvasEditor.Tool.DraggingTool_new"></a>
##### new DraggingTool(appInstance, canvas, searchMode)

| Param | Type | Description |
| --- | --- | --- |
| appInstance | <code>[CanvasEditor](#CanvasEditor)</code> |  |
| canvas | <code>HTMLCanvasElement</code> | — канвас |
| searchMode |  | — Режим поиска фигуры по цвету или по слоям (COLOR_MODE or LAYER_MODE) todo |

<a name="CanvasEditor.Tool.SelectTool"></a>
#### Tool.SelectTool
**Kind**: static class of <code>[Tool](#CanvasEditor.Tool)</code>  
<a name="new_CanvasEditor.Tool.SelectTool_new"></a>
##### new SelectTool(appInstance, canvas)

| Param | Type | Description |
| --- | --- | --- |
| appInstance | <code>[CanvasEditor](#CanvasEditor)</code> |  |
| canvas | <code>HTMLCanvasElement</code> | — канвас Инструмент позволяющий избирать и удалять избранные объекты с холста |

