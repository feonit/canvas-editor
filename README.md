<a name="APP"></a>

## APP : <code>object</code>
**Kind**: global namespace  

* [APP](#APP) : <code>object</code>
    * [.CanvasEditor](#APP.CanvasEditor)
        * [new CanvasEditor(canvas, options)](#new_APP.CanvasEditor_new)
    * [.Point](#APP.Point)
        * [new Point(x, y)](#new_APP.Point_new)
    * [.Curve](#APP.Curve)
        * [new Curve(points, radius)](#new_APP.Curve_new)
    * [.Mediator](#APP.Mediator)
        * [new Mediator()](#new_APP.Mediator_new)
    * [.ObjectsOrder](#APP.ObjectsOrder)
        * [new APP.ObjectsOrder([options])](#new_APP.ObjectsOrder_new)
        * [.order](#APP.ObjectsOrder+order)
    * [.RegionManager](#APP.RegionManager)
        * [new RegionManager(appInstance, canvas)](#new_APP.RegionManager_new)
    * [.StorageManager](#APP.StorageManager)
        * [.getProperty(key)](#APP.StorageManager+getProperty) ⇒
    * [.ToolsDriver](#APP.ToolsDriver)
        * [new ToolsDriver(appInstance, canvas)](#new_APP.ToolsDriver_new)
    * [.ToolController](#APP.ToolController)
        * [.start()](#APP.ToolController+start)
        * [.stop()](#APP.ToolController+stop)
    * [.DraggingAbstract](#APP.DraggingAbstract)
        * [new DraggingAbstract(options)](#new_APP.DraggingAbstract_new)
        * [.offsetHistory](#APP.DraggingAbstract+offsetHistory)
        * [.getRelationCoordinate(coordinates, offset)](#APP.DraggingAbstract+getRelationCoordinate)
    * [.LayerAbstract](#APP.LayerAbstract)
        * [new LayerAbstract(options)](#new_APP.LayerAbstract_new)
        * [.id](#APP.LayerAbstract+id) : <code>number</code>
    * [.OffsetHistory](#APP.OffsetHistory)
        * [new OffsetHistory()](#new_APP.OffsetHistory_new)
        * [.recordsOffset](#APP.OffsetHistory+recordsOffset)
    * [.RasterLayer](#APP.RasterLayer)
        * [new RasterLayer()](#new_APP.RasterLayer_new)
    * [.VectorLayer](#APP.VectorLayer)
        * [new VectorLayer()](#new_APP.VectorLayer_new)
    * [.controllers](#APP.controllers) : <code>object</code>
    * [.algorithms](#APP.algorithms) : <code>object</code>
        * [.searchPixelsAlgorithm(startX, startY, canvas)](#APP.algorithms.searchPixelsAlgorithm)
    * [.views](#APP.views) : <code>object</code>
        * [.CanvasView](#APP.views.CanvasView)
            * [.drawLayer(canvas, layer, offset)](#APP.views.CanvasView.drawLayer)
        * [.RasterLayerView](#APP.views.RasterLayerView)
            * [new RasterLayerView()](#new_APP.views.RasterLayerView_new)
        * [.VectorLayerView](#APP.views.VectorLayerView)
            * [new VectorLayerView()](#new_APP.views.VectorLayerView_new)
            * [.renderCircles(canvas, coordinates, color, radius)](#APP.views.VectorLayerView.renderCircles)
        * [.LayerView(attributes)](#APP.views.LayerView)
            * [.drawBorder()](#APP.views.LayerView+drawBorder)
            * [.eraserBorder()](#APP.views.LayerView+eraserBorder)
    * [.objects](#APP.objects) : <code>object</code>
        * [.LayerBackground](#APP.objects.LayerBackground)
            * [new LayerBackground()](#new_APP.objects.LayerBackground_new)
            * [.createLayerBackground()](#APP.objects.LayerBackground.createLayerBackground)
        * [.LayerObject](#APP.objects.LayerObject)
            * [new LayerObject(options)](#new_APP.objects.LayerObject_new)
        * [.SimpleRaster](#APP.objects.SimpleRaster)
            * [new SimpleRaster()](#new_APP.objects.SimpleRaster_new)
            * [.createObject(canvas, coordinate)](#APP.objects.SimpleRaster.createObject) ⇒ <code>RasterLayer</code>
        * [.ComplexVector](#APP.objects.ComplexVector)
            * [new ComplexVector()](#new_APP.objects.ComplexVector_new)
            * [.points](#APP.objects.ComplexVector+points) : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
        * [.SimpleVector](#APP.objects.SimpleVector)
            * [new SimpleVector()](#new_APP.objects.SimpleVector_new)
            * [.x0](#APP.objects.SimpleVector+x0)
            * [.y0](#APP.objects.SimpleVector+y0)
            * [.x1](#APP.objects.SimpleVector+x1)
            * [.y1](#APP.objects.SimpleVector+y1)
        * [.BrokenComplexVector](#APP.objects.BrokenComplexVector)
            * [new BrokenComplexVector()](#new_APP.objects.BrokenComplexVector_new)
        * [.CurveComplexVector](#APP.objects.CurveComplexVector)
            * [new CurveComplexVector()](#new_APP.objects.CurveComplexVector_new)
        * [.ArrowSimpleVector](#APP.objects.ArrowSimpleVector)
            * [new ArrowSimpleVector()](#new_APP.objects.ArrowSimpleVector_new)
        * [.EllipseSimpleVector](#APP.objects.EllipseSimpleVector)
            * [new EllipseSimpleVector()](#new_APP.objects.EllipseSimpleVector_new)
        * [.LineSimpleVector](#APP.objects.LineSimpleVector)
            * [new LineSimpleVector()](#new_APP.objects.LineSimpleVector_new)
        * [.RectangleSimpleVector](#APP.objects.RectangleSimpleVector)
            * [new RectangleSimpleVector()](#new_APP.objects.RectangleSimpleVector_new)
    * [.PixelsMap(options)](#APP.PixelsMap)
        * [.map](#APP.PixelsMap+map) : <code>Object</code>

<a name="APP.CanvasEditor"></a>

### APP.CanvasEditor
**Kind**: static class of <code>[APP](#APP)</code>  
<a name="new_APP.CanvasEditor_new"></a>

#### new CanvasEditor(canvas, options)
Канвас редактор


| Param | Type |
| --- | --- |
| canvas | <code>HTMLCanvasElement</code> | 
| options | <code>Object</code> | 
| options.lineColor | <code>string</code> | 
| options.lineWidth | <code>number</code> | 
| options.figureType | <code>string</code> | 

<a name="APP.Point"></a>

### APP.Point
**Kind**: static class of <code>[APP](#APP)</code>  
<a name="new_APP.Point_new"></a>

#### new Point(x, y)
Точка


| Param | Type |
| --- | --- |
| x | <code>number</code> | 
| y | <code>number</code> | 

<a name="APP.Curve"></a>

### APP.Curve
**Kind**: static class of <code>[APP](#APP)</code>  
<a name="new_APP.Curve_new"></a>

#### new Curve(points, radius)
Кривая линия


| Param | Type |
| --- | --- |
| points |  | 
| radius | <code>HTMLCanvasElement</code> | 

<a name="APP.Mediator"></a>

### APP.Mediator
**Kind**: static class of <code>[APP](#APP)</code>  
<a name="new_APP.Mediator_new"></a>

#### new Mediator()
Для связи между модулями

<a name="APP.ObjectsOrder"></a>

### APP.ObjectsOrder
**Kind**: static class of <code>[APP](#APP)</code>  

* [.ObjectsOrder](#APP.ObjectsOrder)
    * [new APP.ObjectsOrder([options])](#new_APP.ObjectsOrder_new)
    * [.order](#APP.ObjectsOrder+order)

<a name="new_APP.ObjectsOrder_new"></a>

#### new APP.ObjectsOrder([options])
Класс представляет собой коллекцию объектов в определенной последовательности и 
предоставляет методы по работе с ней


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | — опции |
| options.order | <code>Array.&lt;Object&gt;</code> | — список идентификаторов объектов |

<a name="APP.ObjectsOrder+order"></a>

#### objectsOrder.order
**Kind**: instance property of <code>[ObjectsOrder](#APP.ObjectsOrder)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| order | <code>Array.&lt;number&gt;</code> | Список идентификаторов объектов |

<a name="APP.RegionManager"></a>

### APP.RegionManager
**Kind**: static class of <code>[APP](#APP)</code>  
<a name="new_APP.RegionManager_new"></a>

#### new RegionManager(appInstance, canvas)

| Param | Type |
| --- | --- |
| appInstance |  | 
| canvas | <code>HTMLCanvasElement</code> | 

<a name="APP.StorageManager"></a>

### APP.StorageManager
**Kind**: static class of <code>[APP](#APP)</code>  
**Throw**:   
<a name="APP.StorageManager+getProperty"></a>

#### storageManager.getProperty(key) ⇒
**Kind**: instance method of <code>[StorageManager](#APP.StorageManager)</code>  
**Returns**: null || object  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | — property name |

<a name="APP.ToolsDriver"></a>

### APP.ToolsDriver
**Kind**: static class of <code>[APP](#APP)</code>  
<a name="new_APP.ToolsDriver_new"></a>

#### new ToolsDriver(appInstance, canvas)
Обеспечивает управление инструментами и получение доступа подключаемых инструментов к канвасу


| Param | Type |
| --- | --- |
| appInstance | <code>Object</code> | 
| canvas | <code>HTMLCanvasElement</code> | 

<a name="APP.ToolController"></a>

### APP.ToolController
**Kind**: static class of <code>[APP](#APP)</code>  

* [.ToolController](#APP.ToolController)
    * [.start()](#APP.ToolController+start)
    * [.stop()](#APP.ToolController+stop)

<a name="APP.ToolController+start"></a>

#### toolController.start()
Включение инструмента

**Kind**: instance method of <code>[ToolController](#APP.ToolController)</code>  
<a name="APP.ToolController+stop"></a>

#### toolController.stop()
Отключение инструмента

**Kind**: instance method of <code>[ToolController](#APP.ToolController)</code>  
<a name="APP.DraggingAbstract"></a>

### APP.DraggingAbstract
**Kind**: static class of <code>[APP](#APP)</code>  

* [.DraggingAbstract](#APP.DraggingAbstract)
    * [new DraggingAbstract(options)](#new_APP.DraggingAbstract_new)
    * [.offsetHistory](#APP.DraggingAbstract+offsetHistory)
    * [.getRelationCoordinate(coordinates, offset)](#APP.DraggingAbstract+getRelationCoordinate)

<a name="new_APP.DraggingAbstract_new"></a>

#### new DraggingAbstract(options)
Содержит историю перемещений


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.coordinates | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  |
| options.color | <code>Array.&lt;number&gt;</code> |  |
| options.coordinatesLine | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | — исходные координаты 1-но пиксельной фигуры |

<a name="APP.DraggingAbstract+offsetHistory"></a>

#### draggingAbstract.offsetHistory
Смещение слоя на главноем холсте после транспортировки.

**Kind**: instance property of <code>[DraggingAbstract](#APP.DraggingAbstract)</code>  

| Param | Type |
| --- | --- |
|  | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | 

<a name="APP.DraggingAbstract+getRelationCoordinate"></a>

#### draggingAbstract.getRelationCoordinate(coordinates, offset)
Сгенерировать новый набор оригинальных координат с применением актуального отступа

**Kind**: instance method of <code>[DraggingAbstract](#APP.DraggingAbstract)</code>  

| Param | Type |
| --- | --- |
| coordinates | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | 
| offset | <code>Array.&lt;number&gt;</code> | 

<a name="APP.LayerAbstract"></a>

### APP.LayerAbstract
**Kind**: static class of <code>[APP](#APP)</code>  

* [.LayerAbstract](#APP.LayerAbstract)
    * [new LayerAbstract(options)](#new_APP.LayerAbstract_new)
    * [.id](#APP.LayerAbstract+id) : <code>number</code>

<a name="new_APP.LayerAbstract_new"></a>

#### new LayerAbstract(options)
Базовый класс слоев


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.coordinates | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  |
| options.color | <code>Array.&lt;number&gt;</code> |  |
| options.coordinatesLine | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | — исходные координаты 1-но пиксельной фигуры |

<a name="APP.LayerAbstract+id"></a>

#### layerAbstract.id : <code>number</code>
Уникальный идентификатор объекта

**Kind**: instance property of <code>[LayerAbstract](#APP.LayerAbstract)</code>  
<a name="APP.OffsetHistory"></a>

### APP.OffsetHistory
**Kind**: static class of <code>[APP](#APP)</code>  

* [.OffsetHistory](#APP.OffsetHistory)
    * [new OffsetHistory()](#new_APP.OffsetHistory_new)
    * [.recordsOffset](#APP.OffsetHistory+recordsOffset)

<a name="new_APP.OffsetHistory_new"></a>

#### new OffsetHistory()
История перемещений

<a name="APP.OffsetHistory+recordsOffset"></a>

#### offsetHistory.recordsOffset
Смещение слоя на главноем холсте после транспортировки.

**Kind**: instance property of <code>[OffsetHistory](#APP.OffsetHistory)</code>  

| Param | Type |
| --- | --- |
|  | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | 

<a name="APP.RasterLayer"></a>

### APP.RasterLayer
**Kind**: static class of <code>[APP](#APP)</code>  
<a name="new_APP.RasterLayer_new"></a>

#### new RasterLayer()
Растровый слой

<a name="APP.VectorLayer"></a>

### APP.VectorLayer
**Kind**: static class of <code>[APP](#APP)</code>  
<a name="new_APP.VectorLayer_new"></a>

#### new VectorLayer()
Векторный слой

<a name="APP.controllers"></a>

### APP.controllers : <code>object</code>
**Kind**: static namespace of <code>[APP](#APP)</code>  
<a name="APP.algorithms"></a>

### APP.algorithms : <code>object</code>
**Kind**: static namespace of <code>[APP](#APP)</code>  
<a name="APP.algorithms.searchPixelsAlgorithm"></a>

#### algorithms.searchPixelsAlgorithm(startX, startY, canvas)
Алгоритм поиска области фигуры по координате в режиме поиска по цвету
Последовательный поиск всех похожих прилегающих точек, как непосредственно,
так и посредством аналогичных по цвету точек

**Kind**: static method of <code>[algorithms](#APP.algorithms)</code>  

| Param | Type | Description |
| --- | --- | --- |
| startX | <code>number</code> | — координата X с которой начинается поиск |
| startY | <code>number</code> | — координата Y с которой начинается поиск |
| canvas | <code>HTMLCanvasElement</code> | — анализируемый холст |

<a name="APP.views"></a>

### APP.views : <code>object</code>
**Kind**: static namespace of <code>[APP](#APP)</code>  

* [.views](#APP.views) : <code>object</code>
    * [.CanvasView](#APP.views.CanvasView)
        * [.drawLayer(canvas, layer, offset)](#APP.views.CanvasView.drawLayer)
    * [.RasterLayerView](#APP.views.RasterLayerView)
        * [new RasterLayerView()](#new_APP.views.RasterLayerView_new)
    * [.VectorLayerView](#APP.views.VectorLayerView)
        * [new VectorLayerView()](#new_APP.views.VectorLayerView_new)
        * [.renderCircles(canvas, coordinates, color, radius)](#APP.views.VectorLayerView.renderCircles)
    * [.LayerView(attributes)](#APP.views.LayerView)
        * [.drawBorder()](#APP.views.LayerView+drawBorder)
        * [.eraserBorder()](#APP.views.LayerView+eraserBorder)

<a name="APP.views.CanvasView"></a>

#### views.CanvasView
**Kind**: static class of <code>[views](#APP.views)</code>  
<a name="APP.views.CanvasView.drawLayer"></a>

##### CanvasView.drawLayer(canvas, layer, offset)
**Kind**: static method of <code>[CanvasView](#APP.views.CanvasView)</code>  

| Param | Type |
| --- | --- |
| canvas | <code>HTMLCanvasElement</code> | 
| layer | <code>HTMLCanvasElement</code> | 
| offset | <code>Array.&lt;number&gt;</code> | 

<a name="APP.views.RasterLayerView"></a>

#### views.RasterLayerView
**Kind**: static class of <code>[views](#APP.views)</code>  
<a name="new_APP.views.RasterLayerView_new"></a>

##### new RasterLayerView()
Отвечает за отображение информации

<a name="APP.views.VectorLayerView"></a>

#### views.VectorLayerView
**Kind**: static class of <code>[views](#APP.views)</code>  

* [.VectorLayerView](#APP.views.VectorLayerView)
    * [new VectorLayerView()](#new_APP.views.VectorLayerView_new)
    * [.renderCircles(canvas, coordinates, color, radius)](#APP.views.VectorLayerView.renderCircles)

<a name="new_APP.views.VectorLayerView_new"></a>

##### new VectorLayerView()
Отвечает за отображение информации

<a name="APP.views.VectorLayerView.renderCircles"></a>

##### VectorLayerView.renderCircles(canvas, coordinates, color, radius)
Функция отрисовывает окружности по заданным координатам с заданным цветом

**Kind**: static method of <code>[VectorLayerView](#APP.views.VectorLayerView)</code>  
**Access:** public  

| Param | Type |
| --- | --- |
| canvas | <code>HTMLCanvasElement</code> | 
| coordinates | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | 
| color | <code>Array.&lt;number&gt;</code> | 
| radius | <code>number</code> | 

<a name="APP.views.LayerView"></a>

#### views.LayerView(attributes)
Класс Слой Вид. Отвечает за отображение информации о слое.

**Kind**: static method of <code>[views](#APP.views)</code>  

| Param | Type | Description |
| --- | --- | --- |
| attributes | <code>Object</code> | — атрибуты |
| attributes.width | <code>number</code> | — высота слоя |
| attributes.height | <code>number</code> | — длина слоя |
| attributes.color | <code>Array.&lt;number&gt;</code> | — цвет объекта на слое |
| attributes.borderCoordinates | <code>Array.&lt;number&gt;</code> | — координаты краевых точек объекта |


* [.LayerView(attributes)](#APP.views.LayerView)
    * [.drawBorder()](#APP.views.LayerView+drawBorder)
    * [.eraserBorder()](#APP.views.LayerView+eraserBorder)

<a name="APP.views.LayerView+drawBorder"></a>

##### layerView.drawBorder()
Добавить обводку контуру

**Kind**: instance method of <code>[LayerView](#APP.views.LayerView)</code>  
<a name="APP.views.LayerView+eraserBorder"></a>

##### layerView.eraserBorder()
Убрать обводку c контура

**Kind**: instance method of <code>[LayerView](#APP.views.LayerView)</code>  
<a name="APP.objects"></a>

### APP.objects : <code>object</code>
**Kind**: static namespace of <code>[APP](#APP)</code>  

* [.objects](#APP.objects) : <code>object</code>
    * [.LayerBackground](#APP.objects.LayerBackground)
        * [new LayerBackground()](#new_APP.objects.LayerBackground_new)
        * [.createLayerBackground()](#APP.objects.LayerBackground.createLayerBackground)
    * [.LayerObject](#APP.objects.LayerObject)
        * [new LayerObject(options)](#new_APP.objects.LayerObject_new)
    * [.SimpleRaster](#APP.objects.SimpleRaster)
        * [new SimpleRaster()](#new_APP.objects.SimpleRaster_new)
        * [.createObject(canvas, coordinate)](#APP.objects.SimpleRaster.createObject) ⇒ <code>RasterLayer</code>
    * [.ComplexVector](#APP.objects.ComplexVector)
        * [new ComplexVector()](#new_APP.objects.ComplexVector_new)
        * [.points](#APP.objects.ComplexVector+points) : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
    * [.SimpleVector](#APP.objects.SimpleVector)
        * [new SimpleVector()](#new_APP.objects.SimpleVector_new)
        * [.x0](#APP.objects.SimpleVector+x0)
        * [.y0](#APP.objects.SimpleVector+y0)
        * [.x1](#APP.objects.SimpleVector+x1)
        * [.y1](#APP.objects.SimpleVector+y1)
    * [.BrokenComplexVector](#APP.objects.BrokenComplexVector)
        * [new BrokenComplexVector()](#new_APP.objects.BrokenComplexVector_new)
    * [.CurveComplexVector](#APP.objects.CurveComplexVector)
        * [new CurveComplexVector()](#new_APP.objects.CurveComplexVector_new)
    * [.ArrowSimpleVector](#APP.objects.ArrowSimpleVector)
        * [new ArrowSimpleVector()](#new_APP.objects.ArrowSimpleVector_new)
    * [.EllipseSimpleVector](#APP.objects.EllipseSimpleVector)
        * [new EllipseSimpleVector()](#new_APP.objects.EllipseSimpleVector_new)
    * [.LineSimpleVector](#APP.objects.LineSimpleVector)
        * [new LineSimpleVector()](#new_APP.objects.LineSimpleVector_new)
    * [.RectangleSimpleVector](#APP.objects.RectangleSimpleVector)
        * [new RectangleSimpleVector()](#new_APP.objects.RectangleSimpleVector_new)

<a name="APP.objects.LayerBackground"></a>

#### objects.LayerBackground
**Kind**: static class of <code>[objects](#APP.objects)</code>  

* [.LayerBackground](#APP.objects.LayerBackground)
    * [new LayerBackground()](#new_APP.objects.LayerBackground_new)
    * [.createLayerBackground()](#APP.objects.LayerBackground.createLayerBackground)

<a name="new_APP.objects.LayerBackground_new"></a>

##### new LayerBackground()
Задний главный слой

<a name="APP.objects.LayerBackground.createLayerBackground"></a>

##### LayerBackground.createLayerBackground()
**Kind**: static method of <code>[LayerBackground](#APP.objects.LayerBackground)</code>  
<a name="APP.objects.LayerObject"></a>

#### objects.LayerObject
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.LayerObject_new"></a>

##### new LayerObject(options)
Объект слоя


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.coordinates | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  |
| options.color | <code>Array.&lt;number&gt;</code> |  |
| options.coordinatesLine | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | — исходные координаты 1-но пиксельной фигуры |

<a name="APP.objects.SimpleRaster"></a>

#### objects.SimpleRaster
**Kind**: static class of <code>[objects](#APP.objects)</code>  

* [.SimpleRaster](#APP.objects.SimpleRaster)
    * [new SimpleRaster()](#new_APP.objects.SimpleRaster_new)
    * [.createObject(canvas, coordinate)](#APP.objects.SimpleRaster.createObject) ⇒ <code>RasterLayer</code>

<a name="new_APP.objects.SimpleRaster_new"></a>

##### new SimpleRaster()
Класс определяет две контрольные точки

<a name="APP.objects.SimpleRaster.createObject"></a>

##### SimpleRaster.createObject(canvas, coordinate) ⇒ <code>RasterLayer</code>
**Kind**: static method of <code>[SimpleRaster](#APP.objects.SimpleRaster)</code>  
**Returns**: <code>RasterLayer</code> - объект фигуры  

| Param | Type | Description |
| --- | --- | --- |
| canvas | <code>HTMLCanvasElement</code> | — холст |
| coordinate | <code>Array.&lt;number&gt;</code> | — координата точки на холсте, откуда начнется поиск объекта |

<a name="APP.objects.ComplexVector"></a>

#### objects.ComplexVector
**Kind**: static class of <code>[objects](#APP.objects)</code>  

* [.ComplexVector](#APP.objects.ComplexVector)
    * [new ComplexVector()](#new_APP.objects.ComplexVector_new)
    * [.points](#APP.objects.ComplexVector+points) : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>

<a name="new_APP.objects.ComplexVector_new"></a>

##### new ComplexVector()
Класс определяет массив контрольных точек

<a name="APP.objects.ComplexVector+points"></a>

##### complexVector.points : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
**Kind**: instance property of <code>[ComplexVector](#APP.objects.ComplexVector)</code>  
<a name="APP.objects.SimpleVector"></a>

#### objects.SimpleVector
**Kind**: static class of <code>[objects](#APP.objects)</code>  

* [.SimpleVector](#APP.objects.SimpleVector)
    * [new SimpleVector()](#new_APP.objects.SimpleVector_new)
    * [.x0](#APP.objects.SimpleVector+x0)
    * [.y0](#APP.objects.SimpleVector+y0)
    * [.x1](#APP.objects.SimpleVector+x1)
    * [.y1](#APP.objects.SimpleVector+y1)

<a name="new_APP.objects.SimpleVector_new"></a>

##### new SimpleVector()
Класс определяет две контрольные точки

<a name="APP.objects.SimpleVector+x0"></a>

##### simpleVector.x0
type {number}

**Kind**: instance property of <code>[SimpleVector](#APP.objects.SimpleVector)</code>  
<a name="APP.objects.SimpleVector+y0"></a>

##### simpleVector.y0
type {number}

**Kind**: instance property of <code>[SimpleVector](#APP.objects.SimpleVector)</code>  
<a name="APP.objects.SimpleVector+x1"></a>

##### simpleVector.x1
type {number}

**Kind**: instance property of <code>[SimpleVector](#APP.objects.SimpleVector)</code>  
<a name="APP.objects.SimpleVector+y1"></a>

##### simpleVector.y1
type {number}

**Kind**: instance property of <code>[SimpleVector](#APP.objects.SimpleVector)</code>  
<a name="APP.objects.BrokenComplexVector"></a>

#### objects.BrokenComplexVector
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.BrokenComplexVector_new"></a>

##### new BrokenComplexVector()
Класс определяет по массиву контрольных точек
координаты ломанной линии

<a name="APP.objects.CurveComplexVector"></a>

#### objects.CurveComplexVector
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.CurveComplexVector_new"></a>

##### new CurveComplexVector()
Класс определяет по массиву контрольных точек
координаты кривых безье

<a name="APP.objects.ArrowSimpleVector"></a>

#### objects.ArrowSimpleVector
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.ArrowSimpleVector_new"></a>

##### new ArrowSimpleVector()
Стрелка

<a name="APP.objects.EllipseSimpleVector"></a>

#### objects.EllipseSimpleVector
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.EllipseSimpleVector_new"></a>

##### new EllipseSimpleVector()
Овал

<a name="APP.objects.LineSimpleVector"></a>

#### objects.LineSimpleVector
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.LineSimpleVector_new"></a>

##### new LineSimpleVector()
Прямая

<a name="APP.objects.RectangleSimpleVector"></a>

#### objects.RectangleSimpleVector
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.RectangleSimpleVector_new"></a>

##### new RectangleSimpleVector()
Прямоугольник

<a name="APP.PixelsMap"></a>

### APP.PixelsMap(options)
Объект Карта отвечает за информацию по соотношению каждого пикселя из карты к группе слоев
накладываемых друг на друга в определенном порядке

**Kind**: static method of <code>[APP](#APP)</code>  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| options.map | <code>Array.&lt;Object&gt;</code> | 

<a name="APP.PixelsMap+map"></a>

#### pixelsMap.map : <code>Object</code>
Карта отображения координаты пикселя в порядок слоев расположенных на нем

**Kind**: instance property of <code>[PixelsMap](#APP.PixelsMap)</code>  
