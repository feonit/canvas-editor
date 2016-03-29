<a name="APP"></a>
## APP : <code>object</code>
Глобальная область приложения

**Kind**: global namespace  

* [APP](#APP) : <code>object</code>
    * [.core](#APP.core) : <code>object</code>
        * [.CanvasEditor](#APP.core.CanvasEditor)
            * [new APP.core.CanvasEditor(canvas, options)](#new_APP.core.CanvasEditor_new)
            * [.getTotalState()](#APP.core.CanvasEditor+getTotalState)
        * [.Point](#APP.core.Point)
            * [new APP.core.Point(x, y)](#new_APP.core.Point_new)
        * [.Curve](#APP.core.Curve)
            * [new APP.core.Curve(points)](#new_APP.core.Curve_new)
        * [.Mediator](#APP.core.Mediator)
            * [new APP.core.Mediator()](#new_APP.core.Mediator_new)
        * [.ObjectsOrder](#APP.core.ObjectsOrder)
            * [new APP.core.ObjectsOrder([options])](#new_APP.core.ObjectsOrder_new)
            * [.order](#APP.core.ObjectsOrder+order)
        * [.PixelsMap](#APP.core.PixelsMap)
            * [new APP.core.PixelsMap(options)](#new_APP.core.PixelsMap_new)
            * [.map](#APP.core.PixelsMap+map) : <code>Object</code>
        * [.RegionManager](#APP.core.RegionManager)
            * [new APP.core.RegionManager(appInstance, canvas)](#new_APP.core.RegionManager_new)
        * [.StorageManager](#APP.core.StorageManager)
            * [new APP.core.StorageManager()](#new_APP.core.StorageManager_new)
            * [.getProperty(propName)](#APP.core.StorageManager+getProperty) ⇒
        * [.ToolController](#APP.core.ToolController)
            * [new APP.core.ToolController()](#new_APP.core.ToolController_new)
            * [.start()](#APP.core.ToolController+start)
            * [.stop()](#APP.core.ToolController+stop)
        * [.ToolsDriver](#APP.core.ToolsDriver)
            * [new APP.core.ToolsDriver(appInstance, canvas)](#new_APP.core.ToolsDriver_new)
        * [.OffsetHistory](#APP.core.OffsetHistory)
            * [new APP.core.OffsetHistory()](#new_APP.core.OffsetHistory_new)
            * [.recordsOffset](#APP.core.OffsetHistory+recordsOffset)
        * [.DrawToolController](#APP.core.DrawToolController)
            * [new APP.core.DrawToolController()](#new_APP.core.DrawToolController_new)
            * [.publicNewObject()](#APP.core.DrawToolController+publicNewObject)
        * [.MathFn](#APP.core.MathFn)
            * [.getCircleCoordinates()](#APP.core.MathFn.getCircleCoordinates)
            * [.hexToRgb()](#APP.core.MathFn.hexToRgb)
            * [.hexToRgba()](#APP.core.MathFn.hexToRgba)
    * [.utils](#APP.utils) : <code>object</code>
        * [.SaveLocalUtilController](#APP.utils.SaveLocalUtilController)
            * [new APP.utils.SaveLocalUtilController()](#new_APP.utils.SaveLocalUtilController_new)
        * [.SaveServerUtilController](#APP.utils.SaveServerUtilController)
            * [new APP.utils.SaveServerUtilController()](#new_APP.utils.SaveServerUtilController_new)
    * [.controllers](#APP.controllers) : <code>object</code>
        * [.DraggingToolController](#APP.controllers.DraggingToolController)
            * [new APP.controllers.DraggingToolController()](#new_APP.controllers.DraggingToolController_new)
        * [.EraserToolController](#APP.controllers.EraserToolController)
            * [new APP.controllers.EraserToolController()](#new_APP.controllers.EraserToolController_new)
        * [.SelectToolController](#APP.controllers.SelectToolController)
            * [new APP.controllers.SelectToolController()](#new_APP.controllers.SelectToolController_new)
        * [.DrawBrokenVectorController](#APP.controllers.DrawBrokenVectorController)
            * [new APP.controllers.DrawBrokenVectorController()](#new_APP.controllers.DrawBrokenVectorController_new)
        * [.DrawCurveController](#APP.controllers.DrawCurveController)
            * [new APP.controllers.DrawCurveController()](#new_APP.controllers.DrawCurveController_new)
        * [.DrawSimpleVectorController](#APP.controllers.DrawSimpleVectorController)
            * [new APP.controllers.DrawSimpleVectorController()](#new_APP.controllers.DrawSimpleVectorController_new)
    * [.objects](#APP.objects) : <code>object</code>
        * [.LayerAbstract](#APP.objects.LayerAbstract)
            * [new APP.objects.LayerAbstract(options)](#new_APP.objects.LayerAbstract_new)
            * [.id](#APP.objects.LayerAbstract+id) : <code>number</code>
        * [.LayerBackground](#APP.objects.LayerBackground)
            * [new APP.objects.LayerBackground()](#new_APP.objects.LayerBackground_new)
            * [.createLayerBackground()](#APP.objects.LayerBackground.createLayerBackground)
        * [.LayerObject](#APP.objects.LayerObject)
            * [new APP.objects.LayerObject(options)](#new_APP.objects.LayerObject_new)
            * [.color](#APP.objects.LayerObject+color) : <code>Array.&lt;number&gt;</code>
            * [.offsetHistory](#APP.objects.LayerObject+offsetHistory)
            * [.getRelationCoordinate(coordinates, offset)](#APP.objects.LayerObject+getRelationCoordinate)
            * [.activate()](#APP.objects.LayerObject+activate)
            * [.deactivate()](#APP.objects.LayerObject+deactivate)
        * [.RasterLayer](#APP.objects.RasterLayer)
            * [new APP.objects.RasterLayer()](#new_APP.objects.RasterLayer_new)
        * [.VectorLayerAbstract](#APP.objects.VectorLayerAbstract)
            * [new APP.objects.VectorLayerAbstract()](#new_APP.objects.VectorLayerAbstract_new)
        * [.SimpleRaster](#APP.objects.SimpleRaster)
            * [new APP.objects.SimpleRaster()](#new_APP.objects.SimpleRaster_new)
            * [.createObject(canvas, coordinate)](#APP.objects.SimpleRaster.createObject) ⇒ <code>RasterLayer</code>
        * [.ComplexVectorAbstract](#APP.objects.ComplexVectorAbstract)
            * [new APP.objects.ComplexVectorAbstract()](#new_APP.objects.ComplexVectorAbstract_new)
            * [.points](#APP.objects.ComplexVectorAbstract+points) : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
        * [.SimpleVectorAbstract](#APP.objects.SimpleVectorAbstract)
            * [new APP.objects.SimpleVectorAbstract()](#new_APP.objects.SimpleVectorAbstract_new)
            * [.x0](#APP.objects.SimpleVectorAbstract+x0)
            * [.y0](#APP.objects.SimpleVectorAbstract+y0)
            * [.x1](#APP.objects.SimpleVectorAbstract+x1)
            * [.y1](#APP.objects.SimpleVectorAbstract+y1)
        * [.ArrowSimpleVectorAbstract](#APP.objects.ArrowSimpleVectorAbstract)
            * [new APP.objects.ArrowSimpleVectorAbstract()](#new_APP.objects.ArrowSimpleVectorAbstract_new)
        * [.EllipseSimpleVectorAbstract](#APP.objects.EllipseSimpleVectorAbstract)
            * [new APP.objects.EllipseSimpleVectorAbstract()](#new_APP.objects.EllipseSimpleVectorAbstract_new)
        * [.LineSimpleVectorAbstract](#APP.objects.LineSimpleVectorAbstract)
            * [new APP.objects.LineSimpleVectorAbstract()](#new_APP.objects.LineSimpleVectorAbstract_new)
        * [.RectangleSimpleVectorAbstract](#APP.objects.RectangleSimpleVectorAbstract)
            * [new APP.objects.RectangleSimpleVectorAbstract()](#new_APP.objects.RectangleSimpleVectorAbstract_new)
        * [.BrokenComplexVectorAbstract](#APP.objects.BrokenComplexVectorAbstract)
            * [new APP.objects.BrokenComplexVectorAbstract()](#new_APP.objects.BrokenComplexVectorAbstract_new)
        * [.CurveComplexVectorAbstract](#APP.objects.CurveComplexVectorAbstract)
            * [new APP.objects.CurveComplexVectorAbstract()](#new_APP.objects.CurveComplexVectorAbstract_new)
    * [.algorithms](#APP.algorithms) : <code>object</code>
        * [.searchPixelsAlgorithm(startX, startY, canvas)](#APP.algorithms.searchPixelsAlgorithm)

<a name="APP.core"></a>
### APP.core : <code>object</code>
Основные компоненты системы

**Kind**: static namespace of <code>[APP](#APP)</code>  

* [.core](#APP.core) : <code>object</code>
    * [.CanvasEditor](#APP.core.CanvasEditor)
        * [new APP.core.CanvasEditor(canvas, options)](#new_APP.core.CanvasEditor_new)
        * [.getTotalState()](#APP.core.CanvasEditor+getTotalState)
    * [.Point](#APP.core.Point)
        * [new APP.core.Point(x, y)](#new_APP.core.Point_new)
    * [.Curve](#APP.core.Curve)
        * [new APP.core.Curve(points)](#new_APP.core.Curve_new)
    * [.Mediator](#APP.core.Mediator)
        * [new APP.core.Mediator()](#new_APP.core.Mediator_new)
    * [.ObjectsOrder](#APP.core.ObjectsOrder)
        * [new APP.core.ObjectsOrder([options])](#new_APP.core.ObjectsOrder_new)
        * [.order](#APP.core.ObjectsOrder+order)
    * [.PixelsMap](#APP.core.PixelsMap)
        * [new APP.core.PixelsMap(options)](#new_APP.core.PixelsMap_new)
        * [.map](#APP.core.PixelsMap+map) : <code>Object</code>
    * [.RegionManager](#APP.core.RegionManager)
        * [new APP.core.RegionManager(appInstance, canvas)](#new_APP.core.RegionManager_new)
    * [.StorageManager](#APP.core.StorageManager)
        * [new APP.core.StorageManager()](#new_APP.core.StorageManager_new)
        * [.getProperty(propName)](#APP.core.StorageManager+getProperty) ⇒
    * [.ToolController](#APP.core.ToolController)
        * [new APP.core.ToolController()](#new_APP.core.ToolController_new)
        * [.start()](#APP.core.ToolController+start)
        * [.stop()](#APP.core.ToolController+stop)
    * [.ToolsDriver](#APP.core.ToolsDriver)
        * [new APP.core.ToolsDriver(appInstance, canvas)](#new_APP.core.ToolsDriver_new)
    * [.OffsetHistory](#APP.core.OffsetHistory)
        * [new APP.core.OffsetHistory()](#new_APP.core.OffsetHistory_new)
        * [.recordsOffset](#APP.core.OffsetHistory+recordsOffset)
    * [.DrawToolController](#APP.core.DrawToolController)
        * [new APP.core.DrawToolController()](#new_APP.core.DrawToolController_new)
        * [.publicNewObject()](#APP.core.DrawToolController+publicNewObject)
    * [.MathFn](#APP.core.MathFn)
        * [.getCircleCoordinates()](#APP.core.MathFn.getCircleCoordinates)
        * [.hexToRgb()](#APP.core.MathFn.hexToRgb)
        * [.hexToRgba()](#APP.core.MathFn.hexToRgba)

<a name="APP.core.CanvasEditor"></a>
#### core.CanvasEditor
**Kind**: static class of <code>[core](#APP.core)</code>  

* [.CanvasEditor](#APP.core.CanvasEditor)
    * [new APP.core.CanvasEditor(canvas, options)](#new_APP.core.CanvasEditor_new)
    * [.getTotalState()](#APP.core.CanvasEditor+getTotalState)

<a name="new_APP.core.CanvasEditor_new"></a>
##### new APP.core.CanvasEditor(canvas, options)
Канвас редактор


| Param | Type |
| --- | --- |
| canvas | <code>HTMLCanvasElement</code> | 
| options | <code>Object</code> | 
| options.lineColor | <code>string</code> | 
| options.lineWidth | <code>number</code> | 
| options.figureType | <code>string</code> | 

<a name="APP.core.CanvasEditor+getTotalState"></a>
##### canvasEditor.getTotalState()
Метод считывает состояния определенных компонентов системы и подготоваливает
данные для последующей инициализации приложения

**Kind**: instance method of <code>[CanvasEditor](#APP.core.CanvasEditor)</code>  
<a name="APP.core.Point"></a>
#### core.Point
**Kind**: static class of <code>[core](#APP.core)</code>  
<a name="new_APP.core.Point_new"></a>
##### new APP.core.Point(x, y)
Точка


| Param | Type |
| --- | --- |
| x | <code>number</code> | 
| y | <code>number</code> | 

<a name="APP.core.Curve"></a>
#### core.Curve
**Kind**: static class of <code>[core](#APP.core)</code>  
<a name="new_APP.core.Curve_new"></a>
##### new APP.core.Curve(points)
Кривая линия


| Param |
| --- |
| points | 

<a name="APP.core.Mediator"></a>
#### core.Mediator
**Kind**: static class of <code>[core](#APP.core)</code>  
<a name="new_APP.core.Mediator_new"></a>
##### new APP.core.Mediator()
Для связи между модулями

<a name="APP.core.ObjectsOrder"></a>
#### core.ObjectsOrder
**Kind**: static class of <code>[core](#APP.core)</code>  

* [.ObjectsOrder](#APP.core.ObjectsOrder)
    * [new APP.core.ObjectsOrder([options])](#new_APP.core.ObjectsOrder_new)
    * [.order](#APP.core.ObjectsOrder+order)

<a name="new_APP.core.ObjectsOrder_new"></a>
##### new APP.core.ObjectsOrder([options])
Класс представляет собой коллекцию объектов в определенной последовательности и 
предоставляет методы по работе с ней


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | — опции |
| options.order | <code>Array.&lt;Object&gt;</code> | — список идентификаторов объектов |

<a name="APP.core.ObjectsOrder+order"></a>
##### objectsOrder.order
**Kind**: instance property of <code>[ObjectsOrder](#APP.core.ObjectsOrder)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| order | <code>Array.&lt;number&gt;</code> | Список идентификаторов объектов |

<a name="APP.core.PixelsMap"></a>
#### core.PixelsMap
**Kind**: static class of <code>[core](#APP.core)</code>  

* [.PixelsMap](#APP.core.PixelsMap)
    * [new APP.core.PixelsMap(options)](#new_APP.core.PixelsMap_new)
    * [.map](#APP.core.PixelsMap+map) : <code>Object</code>

<a name="new_APP.core.PixelsMap_new"></a>
##### new APP.core.PixelsMap(options)
Объект Карта отвечает за информацию по соотношению каждого пикселя из карты к группе слоев
накладываемых друг на друга в определенном порядке


| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| options.map | <code>Array.&lt;Object&gt;</code> | 

<a name="APP.core.PixelsMap+map"></a>
##### pixelsMap.map : <code>Object</code>
Карта отображения координаты пикселя в порядок слоев расположенных на нем

**Kind**: instance property of <code>[PixelsMap](#APP.core.PixelsMap)</code>  
<a name="APP.core.RegionManager"></a>
#### core.RegionManager
**Kind**: static class of <code>[core](#APP.core)</code>  
<a name="new_APP.core.RegionManager_new"></a>
##### new APP.core.RegionManager(appInstance, canvas)
Управление объектами на холсте


| Param | Type |
| --- | --- |
| appInstance |  | 
| canvas | <code>HTMLCanvasElement</code> | 

<a name="APP.core.StorageManager"></a>
#### core.StorageManager
**Kind**: static class of <code>[core](#APP.core)</code>  
**Throw**:   

* [.StorageManager](#APP.core.StorageManager)
    * [new APP.core.StorageManager()](#new_APP.core.StorageManager_new)
    * [.getProperty(propName)](#APP.core.StorageManager+getProperty) ⇒

<a name="new_APP.core.StorageManager_new"></a>
##### new APP.core.StorageManager()
Работа с локальным хранилищем, для сохранения состояния

<a name="APP.core.StorageManager+getProperty"></a>
##### storageManager.getProperty(propName) ⇒
**Kind**: instance method of <code>[StorageManager](#APP.core.StorageManager)</code>  
**Returns**: null || object  

| Param | Type | Description |
| --- | --- | --- |
| propName | <code>String</code> | — property name |

<a name="APP.core.ToolController"></a>
#### core.ToolController
**Kind**: static class of <code>[core](#APP.core)</code>  

* [.ToolController](#APP.core.ToolController)
    * [new APP.core.ToolController()](#new_APP.core.ToolController_new)
    * [.start()](#APP.core.ToolController+start)
    * [.stop()](#APP.core.ToolController+stop)

<a name="new_APP.core.ToolController_new"></a>
##### new APP.core.ToolController()
Интерфейс для контроллеров

<a name="APP.core.ToolController+start"></a>
##### toolController.start()
Включение инструмента

**Kind**: instance method of <code>[ToolController](#APP.core.ToolController)</code>  
<a name="APP.core.ToolController+stop"></a>
##### toolController.stop()
Отключение инструмента

**Kind**: instance method of <code>[ToolController](#APP.core.ToolController)</code>  
<a name="APP.core.ToolsDriver"></a>
#### core.ToolsDriver
**Kind**: static class of <code>[core](#APP.core)</code>  
<a name="new_APP.core.ToolsDriver_new"></a>
##### new APP.core.ToolsDriver(appInstance, canvas)
Обеспечивает управление инструментами и получение доступа подключаемых инструментов к канвасу


| Param | Type |
| --- | --- |
| appInstance | <code>Object</code> | 
| canvas | <code>HTMLCanvasElement</code> | 

<a name="APP.core.OffsetHistory"></a>
#### core.OffsetHistory
**Kind**: static class of <code>[core](#APP.core)</code>  

* [.OffsetHistory](#APP.core.OffsetHistory)
    * [new APP.core.OffsetHistory()](#new_APP.core.OffsetHistory_new)
    * [.recordsOffset](#APP.core.OffsetHistory+recordsOffset)

<a name="new_APP.core.OffsetHistory_new"></a>
##### new APP.core.OffsetHistory()
История перемещений

<a name="APP.core.OffsetHistory+recordsOffset"></a>
##### offsetHistory.recordsOffset
Смещение слоя на главноем холсте после транспортировки.

**Kind**: instance property of <code>[OffsetHistory](#APP.core.OffsetHistory)</code>  

| Param | Type |
| --- | --- |
|  | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | 

<a name="APP.core.DrawToolController"></a>
#### core.DrawToolController
**Kind**: static class of <code>[core](#APP.core)</code>  

* [.DrawToolController](#APP.core.DrawToolController)
    * [new APP.core.DrawToolController()](#new_APP.core.DrawToolController_new)
    * [.publicNewObject()](#APP.core.DrawToolController+publicNewObject)

<a name="new_APP.core.DrawToolController_new"></a>
##### new APP.core.DrawToolController()
Базовое поведение для инструмента рисования

<a name="APP.core.DrawToolController+publicNewObject"></a>
##### drawToolController.publicNewObject()
Создает новое изображение нарисованной линии и сохраняет

**Kind**: instance method of <code>[DrawToolController](#APP.core.DrawToolController)</code>  
<a name="APP.core.MathFn"></a>
#### core.MathFn
**Kind**: static property of <code>[core](#APP.core)</code>  

* [.MathFn](#APP.core.MathFn)
    * [.getCircleCoordinates()](#APP.core.MathFn.getCircleCoordinates)
    * [.hexToRgb()](#APP.core.MathFn.hexToRgb)
    * [.hexToRgba()](#APP.core.MathFn.hexToRgba)

<a name="APP.core.MathFn.getCircleCoordinates"></a>
##### MathFn.getCircleCoordinates()
Получить список координат для всех точек принадлежащих к окружности с заданным радиусом
Функция кеширует результат по радиусу

**Kind**: static method of <code>[MathFn](#APP.core.MathFn)</code>  
<a name="APP.core.MathFn.hexToRgb"></a>
##### MathFn.hexToRgb()
Переводит цвет в нужный формат

**Kind**: static method of <code>[MathFn](#APP.core.MathFn)</code>  
<a name="APP.core.MathFn.hexToRgba"></a>
##### MathFn.hexToRgba()
Переводит цвет в нужный формат

**Kind**: static method of <code>[MathFn](#APP.core.MathFn)</code>  
<a name="APP.utils"></a>
### APP.utils : <code>object</code>
Утилиты, не имеют интерфейсов ввода конфигурационных данных,
получают настройки только из глобального конфигуратора приложения,
по умолчанию они отключены,

**Kind**: static namespace of <code>[APP](#APP)</code>  

* [.utils](#APP.utils) : <code>object</code>
    * [.SaveLocalUtilController](#APP.utils.SaveLocalUtilController)
        * [new APP.utils.SaveLocalUtilController()](#new_APP.utils.SaveLocalUtilController_new)
    * [.SaveServerUtilController](#APP.utils.SaveServerUtilController)
        * [new APP.utils.SaveServerUtilController()](#new_APP.utils.SaveServerUtilController_new)

<a name="APP.utils.SaveLocalUtilController"></a>
#### utils.SaveLocalUtilController
**Kind**: static class of <code>[utils](#APP.utils)</code>  
<a name="new_APP.utils.SaveLocalUtilController_new"></a>
##### new APP.utils.SaveLocalUtilController()
Автоматическое сохранение состояния приложения локально

<a name="APP.utils.SaveServerUtilController"></a>
#### utils.SaveServerUtilController
**Kind**: static class of <code>[utils](#APP.utils)</code>  
<a name="new_APP.utils.SaveServerUtilController_new"></a>
##### new APP.utils.SaveServerUtilController()
Автоматическое сохранение состояния приложения на сервер

<a name="APP.controllers"></a>
### APP.controllers : <code>object</code>
Контроллеры инструментов, в настоящий момент времени включенным может быть только один из них,
поэтому находятся исключительно под управлением APP.core.ToolsDriver

**Kind**: static namespace of <code>[APP](#APP)</code>  

* [.controllers](#APP.controllers) : <code>object</code>
    * [.DraggingToolController](#APP.controllers.DraggingToolController)
        * [new APP.controllers.DraggingToolController()](#new_APP.controllers.DraggingToolController_new)
    * [.EraserToolController](#APP.controllers.EraserToolController)
        * [new APP.controllers.EraserToolController()](#new_APP.controllers.EraserToolController_new)
    * [.SelectToolController](#APP.controllers.SelectToolController)
        * [new APP.controllers.SelectToolController()](#new_APP.controllers.SelectToolController_new)
    * [.DrawBrokenVectorController](#APP.controllers.DrawBrokenVectorController)
        * [new APP.controllers.DrawBrokenVectorController()](#new_APP.controllers.DrawBrokenVectorController_new)
    * [.DrawCurveController](#APP.controllers.DrawCurveController)
        * [new APP.controllers.DrawCurveController()](#new_APP.controllers.DrawCurveController_new)
    * [.DrawSimpleVectorController](#APP.controllers.DrawSimpleVectorController)
        * [new APP.controllers.DrawSimpleVectorController()](#new_APP.controllers.DrawSimpleVectorController_new)

<a name="APP.controllers.DraggingToolController"></a>
#### controllers.DraggingToolController
**Kind**: static class of <code>[controllers](#APP.controllers)</code>  
<a name="new_APP.controllers.DraggingToolController_new"></a>
##### new APP.controllers.DraggingToolController()
Контроллер для переноса объектов

<a name="APP.controllers.EraserToolController"></a>
#### controllers.EraserToolController
**Kind**: static class of <code>[controllers](#APP.controllers)</code>  
<a name="new_APP.controllers.EraserToolController_new"></a>
##### new APP.controllers.EraserToolController()
Контроллер для стерки

<a name="APP.controllers.SelectToolController"></a>
#### controllers.SelectToolController
**Kind**: static class of <code>[controllers](#APP.controllers)</code>  
<a name="new_APP.controllers.SelectToolController_new"></a>
##### new APP.controllers.SelectToolController()
Контроллер выборки/удаления объектов

<a name="APP.controllers.DrawBrokenVectorController"></a>
#### controllers.DrawBrokenVectorController
**Kind**: static class of <code>[controllers](#APP.controllers)</code>  
<a name="new_APP.controllers.DrawBrokenVectorController_new"></a>
##### new APP.controllers.DrawBrokenVectorController()
Контроллер для рисования ломанной линии

<a name="APP.controllers.DrawCurveController"></a>
#### controllers.DrawCurveController
**Kind**: static class of <code>[controllers](#APP.controllers)</code>  
<a name="new_APP.controllers.DrawCurveController_new"></a>
##### new APP.controllers.DrawCurveController()
Контроллер для рисования кривой линии

<a name="APP.controllers.DrawSimpleVectorController"></a>
#### controllers.DrawSimpleVectorController
**Kind**: static class of <code>[controllers](#APP.controllers)</code>  
<a name="new_APP.controllers.DrawSimpleVectorController_new"></a>
##### new APP.controllers.DrawSimpleVectorController()
Контроллер для рисования примитивной фигуры

<a name="APP.objects"></a>
### APP.objects : <code>object</code>
Модели данных графических изображений

**Kind**: static namespace of <code>[APP](#APP)</code>  

* [.objects](#APP.objects) : <code>object</code>
    * [.LayerAbstract](#APP.objects.LayerAbstract)
        * [new APP.objects.LayerAbstract(options)](#new_APP.objects.LayerAbstract_new)
        * [.id](#APP.objects.LayerAbstract+id) : <code>number</code>
    * [.LayerBackground](#APP.objects.LayerBackground)
        * [new APP.objects.LayerBackground()](#new_APP.objects.LayerBackground_new)
        * [.createLayerBackground()](#APP.objects.LayerBackground.createLayerBackground)
    * [.LayerObject](#APP.objects.LayerObject)
        * [new APP.objects.LayerObject(options)](#new_APP.objects.LayerObject_new)
        * [.color](#APP.objects.LayerObject+color) : <code>Array.&lt;number&gt;</code>
        * [.offsetHistory](#APP.objects.LayerObject+offsetHistory)
        * [.getRelationCoordinate(coordinates, offset)](#APP.objects.LayerObject+getRelationCoordinate)
        * [.activate()](#APP.objects.LayerObject+activate)
        * [.deactivate()](#APP.objects.LayerObject+deactivate)
    * [.RasterLayer](#APP.objects.RasterLayer)
        * [new APP.objects.RasterLayer()](#new_APP.objects.RasterLayer_new)
    * [.VectorLayerAbstract](#APP.objects.VectorLayerAbstract)
        * [new APP.objects.VectorLayerAbstract()](#new_APP.objects.VectorLayerAbstract_new)
    * [.SimpleRaster](#APP.objects.SimpleRaster)
        * [new APP.objects.SimpleRaster()](#new_APP.objects.SimpleRaster_new)
        * [.createObject(canvas, coordinate)](#APP.objects.SimpleRaster.createObject) ⇒ <code>RasterLayer</code>
    * [.ComplexVectorAbstract](#APP.objects.ComplexVectorAbstract)
        * [new APP.objects.ComplexVectorAbstract()](#new_APP.objects.ComplexVectorAbstract_new)
        * [.points](#APP.objects.ComplexVectorAbstract+points) : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
    * [.SimpleVectorAbstract](#APP.objects.SimpleVectorAbstract)
        * [new APP.objects.SimpleVectorAbstract()](#new_APP.objects.SimpleVectorAbstract_new)
        * [.x0](#APP.objects.SimpleVectorAbstract+x0)
        * [.y0](#APP.objects.SimpleVectorAbstract+y0)
        * [.x1](#APP.objects.SimpleVectorAbstract+x1)
        * [.y1](#APP.objects.SimpleVectorAbstract+y1)
    * [.ArrowSimpleVectorAbstract](#APP.objects.ArrowSimpleVectorAbstract)
        * [new APP.objects.ArrowSimpleVectorAbstract()](#new_APP.objects.ArrowSimpleVectorAbstract_new)
    * [.EllipseSimpleVectorAbstract](#APP.objects.EllipseSimpleVectorAbstract)
        * [new APP.objects.EllipseSimpleVectorAbstract()](#new_APP.objects.EllipseSimpleVectorAbstract_new)
    * [.LineSimpleVectorAbstract](#APP.objects.LineSimpleVectorAbstract)
        * [new APP.objects.LineSimpleVectorAbstract()](#new_APP.objects.LineSimpleVectorAbstract_new)
    * [.RectangleSimpleVectorAbstract](#APP.objects.RectangleSimpleVectorAbstract)
        * [new APP.objects.RectangleSimpleVectorAbstract()](#new_APP.objects.RectangleSimpleVectorAbstract_new)
    * [.BrokenComplexVectorAbstract](#APP.objects.BrokenComplexVectorAbstract)
        * [new APP.objects.BrokenComplexVectorAbstract()](#new_APP.objects.BrokenComplexVectorAbstract_new)
    * [.CurveComplexVectorAbstract](#APP.objects.CurveComplexVectorAbstract)
        * [new APP.objects.CurveComplexVectorAbstract()](#new_APP.objects.CurveComplexVectorAbstract_new)

<a name="APP.objects.LayerAbstract"></a>
#### objects.LayerAbstract
**Kind**: static class of <code>[objects](#APP.objects)</code>  

* [.LayerAbstract](#APP.objects.LayerAbstract)
    * [new APP.objects.LayerAbstract(options)](#new_APP.objects.LayerAbstract_new)
    * [.id](#APP.objects.LayerAbstract+id) : <code>number</code>

<a name="new_APP.objects.LayerAbstract_new"></a>
##### new APP.objects.LayerAbstract(options)
Базовый класс слоев


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.coordinates | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  |
| options.color | <code>Array.&lt;number&gt;</code> |  |
| options.coordinatesLine | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | — исходные координаты 1-но пиксельной фигуры |

<a name="APP.objects.LayerAbstract+id"></a>
##### layerAbstract.id : <code>number</code>
Уникальный идентификатор объекта

**Kind**: instance property of <code>[LayerAbstract](#APP.objects.LayerAbstract)</code>  
<a name="APP.objects.LayerBackground"></a>
#### objects.LayerBackground
**Kind**: static class of <code>[objects](#APP.objects)</code>  

* [.LayerBackground](#APP.objects.LayerBackground)
    * [new APP.objects.LayerBackground()](#new_APP.objects.LayerBackground_new)
    * [.createLayerBackground()](#APP.objects.LayerBackground.createLayerBackground)

<a name="new_APP.objects.LayerBackground_new"></a>
##### new APP.objects.LayerBackground()
Задний главный слой

<a name="APP.objects.LayerBackground.createLayerBackground"></a>
##### LayerBackground.createLayerBackground()
**Kind**: static method of <code>[LayerBackground](#APP.objects.LayerBackground)</code>  
<a name="APP.objects.LayerObject"></a>
#### objects.LayerObject
**Kind**: static class of <code>[objects](#APP.objects)</code>  

* [.LayerObject](#APP.objects.LayerObject)
    * [new APP.objects.LayerObject(options)](#new_APP.objects.LayerObject_new)
    * [.color](#APP.objects.LayerObject+color) : <code>Array.&lt;number&gt;</code>
    * [.offsetHistory](#APP.objects.LayerObject+offsetHistory)
    * [.getRelationCoordinate(coordinates, offset)](#APP.objects.LayerObject+getRelationCoordinate)
    * [.activate()](#APP.objects.LayerObject+activate)
    * [.deactivate()](#APP.objects.LayerObject+deactivate)

<a name="new_APP.objects.LayerObject_new"></a>
##### new APP.objects.LayerObject(options)
Объект слоя


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.coordinates | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  |
| options.color | <code>Array.&lt;number&gt;</code> |  |
| options.coordinatesLine | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | — исходные координаты 1-но пиксельной фигуры |

<a name="APP.objects.LayerObject+color"></a>
##### layerObject.color : <code>Array.&lt;number&gt;</code>
Регион имеет один цвет

**Kind**: instance property of <code>[LayerObject](#APP.objects.LayerObject)</code>  
<a name="APP.objects.LayerObject+offsetHistory"></a>
##### layerObject.offsetHistory
Смещение слоя на главноем холсте после транспортировки.

**Kind**: instance property of <code>[LayerObject](#APP.objects.LayerObject)</code>  

| Param | Type |
| --- | --- |
|  | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | 

<a name="APP.objects.LayerObject+getRelationCoordinate"></a>
##### layerObject.getRelationCoordinate(coordinates, offset)
Сгенерировать новый набор оригинальных координат с применением актуального отступа

**Kind**: instance method of <code>[LayerObject](#APP.objects.LayerObject)</code>  

| Param | Type |
| --- | --- |
| coordinates | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | 
| offset | <code>Array.&lt;number&gt;</code> | 

<a name="APP.objects.LayerObject+activate"></a>
##### layerObject.activate()
Метод создания подцветки

**Kind**: instance method of <code>[LayerObject](#APP.objects.LayerObject)</code>  
<a name="APP.objects.LayerObject+deactivate"></a>
##### layerObject.deactivate()
Метод удаления подцветки, путем восстановление ранее сохраненной копии оригинального лейаута

**Kind**: instance method of <code>[LayerObject](#APP.objects.LayerObject)</code>  
<a name="APP.objects.RasterLayer"></a>
#### objects.RasterLayer
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.RasterLayer_new"></a>
##### new APP.objects.RasterLayer()
Растровый слой

<a name="APP.objects.VectorLayerAbstract"></a>
#### objects.VectorLayerAbstract
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.VectorLayerAbstract_new"></a>
##### new APP.objects.VectorLayerAbstract()
Векторный слой

<a name="APP.objects.SimpleRaster"></a>
#### objects.SimpleRaster
**Kind**: static class of <code>[objects](#APP.objects)</code>  

* [.SimpleRaster](#APP.objects.SimpleRaster)
    * [new APP.objects.SimpleRaster()](#new_APP.objects.SimpleRaster_new)
    * [.createObject(canvas, coordinate)](#APP.objects.SimpleRaster.createObject) ⇒ <code>RasterLayer</code>

<a name="new_APP.objects.SimpleRaster_new"></a>
##### new APP.objects.SimpleRaster()
Класс определяет две контрольные точки

<a name="APP.objects.SimpleRaster.createObject"></a>
##### SimpleRaster.createObject(canvas, coordinate) ⇒ <code>RasterLayer</code>
**Kind**: static method of <code>[SimpleRaster](#APP.objects.SimpleRaster)</code>  
**Returns**: <code>RasterLayer</code> - объект фигуры  

| Param | Type | Description |
| --- | --- | --- |
| canvas | <code>HTMLCanvasElement</code> | — холст |
| coordinate | <code>Array.&lt;number&gt;</code> | — координата точки на холсте, откуда начнется поиск объекта |

<a name="APP.objects.ComplexVectorAbstract"></a>
#### objects.ComplexVectorAbstract
**Kind**: static class of <code>[objects](#APP.objects)</code>  

* [.ComplexVectorAbstract](#APP.objects.ComplexVectorAbstract)
    * [new APP.objects.ComplexVectorAbstract()](#new_APP.objects.ComplexVectorAbstract_new)
    * [.points](#APP.objects.ComplexVectorAbstract+points) : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>

<a name="new_APP.objects.ComplexVectorAbstract_new"></a>
##### new APP.objects.ComplexVectorAbstract()
Класс определяет массив контрольных точек

<a name="APP.objects.ComplexVectorAbstract+points"></a>
##### complexVectorAbstract.points : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
**Kind**: instance property of <code>[ComplexVectorAbstract](#APP.objects.ComplexVectorAbstract)</code>  
<a name="APP.objects.SimpleVectorAbstract"></a>
#### objects.SimpleVectorAbstract
**Kind**: static class of <code>[objects](#APP.objects)</code>  

* [.SimpleVectorAbstract](#APP.objects.SimpleVectorAbstract)
    * [new APP.objects.SimpleVectorAbstract()](#new_APP.objects.SimpleVectorAbstract_new)
    * [.x0](#APP.objects.SimpleVectorAbstract+x0)
    * [.y0](#APP.objects.SimpleVectorAbstract+y0)
    * [.x1](#APP.objects.SimpleVectorAbstract+x1)
    * [.y1](#APP.objects.SimpleVectorAbstract+y1)

<a name="new_APP.objects.SimpleVectorAbstract_new"></a>
##### new APP.objects.SimpleVectorAbstract()
Класс определяет две контрольные точки

<a name="APP.objects.SimpleVectorAbstract+x0"></a>
##### simpleVectorAbstract.x0
type {number}

**Kind**: instance property of <code>[SimpleVectorAbstract](#APP.objects.SimpleVectorAbstract)</code>  
<a name="APP.objects.SimpleVectorAbstract+y0"></a>
##### simpleVectorAbstract.y0
type {number}

**Kind**: instance property of <code>[SimpleVectorAbstract](#APP.objects.SimpleVectorAbstract)</code>  
<a name="APP.objects.SimpleVectorAbstract+x1"></a>
##### simpleVectorAbstract.x1
type {number}

**Kind**: instance property of <code>[SimpleVectorAbstract](#APP.objects.SimpleVectorAbstract)</code>  
<a name="APP.objects.SimpleVectorAbstract+y1"></a>
##### simpleVectorAbstract.y1
type {number}

**Kind**: instance property of <code>[SimpleVectorAbstract](#APP.objects.SimpleVectorAbstract)</code>  
<a name="APP.objects.ArrowSimpleVectorAbstract"></a>
#### objects.ArrowSimpleVectorAbstract
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.ArrowSimpleVectorAbstract_new"></a>
##### new APP.objects.ArrowSimpleVectorAbstract()
Стрелка

<a name="APP.objects.EllipseSimpleVectorAbstract"></a>
#### objects.EllipseSimpleVectorAbstract
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.EllipseSimpleVectorAbstract_new"></a>
##### new APP.objects.EllipseSimpleVectorAbstract()
Овал

<a name="APP.objects.LineSimpleVectorAbstract"></a>
#### objects.LineSimpleVectorAbstract
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.LineSimpleVectorAbstract_new"></a>
##### new APP.objects.LineSimpleVectorAbstract()
Прямая

<a name="APP.objects.RectangleSimpleVectorAbstract"></a>
#### objects.RectangleSimpleVectorAbstract
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.RectangleSimpleVectorAbstract_new"></a>
##### new APP.objects.RectangleSimpleVectorAbstract()
Прямоугольник

<a name="APP.objects.BrokenComplexVectorAbstract"></a>
#### objects.BrokenComplexVectorAbstract
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.BrokenComplexVectorAbstract_new"></a>
##### new APP.objects.BrokenComplexVectorAbstract()
Класс определяет по массиву контрольных точек
координаты ломанной линии

<a name="APP.objects.CurveComplexVectorAbstract"></a>
#### objects.CurveComplexVectorAbstract
**Kind**: static class of <code>[objects](#APP.objects)</code>  
<a name="new_APP.objects.CurveComplexVectorAbstract_new"></a>
##### new APP.objects.CurveComplexVectorAbstract()
Класс определяет по массиву контрольных точек
координаты кривых безье

<a name="APP.algorithms"></a>
### APP.algorithms : <code>object</code>
Область для сложных вычислений

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

