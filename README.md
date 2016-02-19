<a name="CanvasEditor"></a>
## CanvasEditor
**Kind**: global class  

* [CanvasEditor](#CanvasEditor)
    * [new CanvasEditor(options)](#new_CanvasEditor_new)
    * [.Point](#CanvasEditor.Point)
        * [new Point(x, y)](#new_CanvasEditor.Point_new)
    * [.Curve](#CanvasEditor.Curve)
        * [new Curve(points, radius)](#new_CanvasEditor.Curve_new)
    * [.LayersManager](#CanvasEditor.LayersManager)
        * [new LayersManager(appInstance, canvas)](#new_CanvasEditor.LayersManager_new)
    * [.RegionObject](#CanvasEditor.RegionObject)
        * [new RegionObject(options)](#new_CanvasEditor.RegionObject_new)
    * [.ToolController](#CanvasEditor.ToolController)
    * [.ToolsDriver](#CanvasEditor.ToolsDriver)
        * [new ToolsDriver(appInstance, canvas)](#new_CanvasEditor.ToolsDriver_new)
    * [.MathFn](#CanvasEditor.MathFn)
        * [.getCircleCoordinates()](#CanvasEditor.MathFn.getCircleCoordinates)
        * [.drawBezierCurve()](#CanvasEditor.MathFn.drawBezierCurve)
        * [.hexToRgb()](#CanvasEditor.MathFn.hexToRgb)
        * [.hexToRgba()](#CanvasEditor.MathFn.hexToRgba)

<a name="new_CanvasEditor_new"></a>
### new CanvasEditor(options)
Канвас редактор


| Param | Type |
| --- | --- |
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

<a name="CanvasEditor.LayersManager"></a>
### CanvasEditor.LayersManager
**Kind**: static class of <code>[CanvasEditor](#CanvasEditor)</code>  
<a name="new_CanvasEditor.LayersManager_new"></a>
#### new LayersManager(appInstance, canvas)

| Param | Type |
| --- | --- |
| appInstance |  | 
| canvas | <code>HTMLCanvasElement</code> | 

<a name="CanvasEditor.RegionObject"></a>
### CanvasEditor.RegionObject
**Kind**: static class of <code>[CanvasEditor](#CanvasEditor)</code>  
<a name="new_CanvasEditor.RegionObject_new"></a>
#### new RegionObject(options)

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| options.canvas | <code>HTMLCanvasElement</code> | 
| options.coordinates | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | 
| options.borderCoordinates | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | 

<a name="CanvasEditor.ToolController"></a>
### CanvasEditor.ToolController
**Kind**: static class of <code>[CanvasEditor](#CanvasEditor)</code>  
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

<a name="CanvasEditor.MathFn"></a>
### CanvasEditor.MathFn
**Kind**: static property of <code>[CanvasEditor](#CanvasEditor)</code>  

* [.MathFn](#CanvasEditor.MathFn)
    * [.getCircleCoordinates()](#CanvasEditor.MathFn.getCircleCoordinates)
    * [.drawBezierCurve()](#CanvasEditor.MathFn.drawBezierCurve)
    * [.hexToRgb()](#CanvasEditor.MathFn.hexToRgb)
    * [.hexToRgba()](#CanvasEditor.MathFn.hexToRgba)

<a name="CanvasEditor.MathFn.getCircleCoordinates"></a>
#### MathFn.getCircleCoordinates()
Получить список координат для всех точек принадлежащих к окружности с заданным радиусом
Функция кеширует результат по радиусу

**Kind**: static method of <code>[MathFn](#CanvasEditor.MathFn)</code>  
<a name="CanvasEditor.MathFn.drawBezierCurve"></a>
#### MathFn.drawBezierCurve()
Генерирует координаты точек основываясь на информации о кривой

**Kind**: static method of <code>[MathFn](#CanvasEditor.MathFn)</code>  
<a name="CanvasEditor.MathFn.hexToRgb"></a>
#### MathFn.hexToRgb()
Переводит цвет в нужный формат

**Kind**: static method of <code>[MathFn](#CanvasEditor.MathFn)</code>  
<a name="CanvasEditor.MathFn.hexToRgba"></a>
#### MathFn.hexToRgba()
Переводит цвет в нужный формат

**Kind**: static method of <code>[MathFn](#CanvasEditor.MathFn)</code>  
