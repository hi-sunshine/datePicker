# datePicker
This project provided a easy-used datepicker plugin.

Usage
-----
1. Import the `bupt.datepicker.js` into your page.<br>
```javascript
<script type="text/javascript" src="bupt.datepicker.js"></script>
```
2. Use the datepicker like follow:<br>
```html
<input type="text" id="inputID">
```
<br>
```javascript
  <script type="text/javascript">
		  datepicker.init('inputID');
  </script>
```
3. Suggest add some style to `<input>` to show better , just like:
```html
<input type="text" id="inputText" class="datepicker-input">
```
<br>
```javascript
 <style>
		.datepicker-input{
			border:1px solid #ccc;
			border-radius: 4px;
			padding: 5px;
			height: 24px;
			line-height: 24px;
			width:230px;
		}
	</style>
```
Example
----
`example.html` provided an complete example of this datapicker plugin.



