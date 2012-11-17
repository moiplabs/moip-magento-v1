var $j_mw = jQuery.noConflict();
var tmp = 0;
$j_mw(function(){	
	
	
	//color picker
	$j_mw('#onestepcheckout_config_style_color').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
		$j_mw(el).val(hex);
		$j_mw(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			$j_mw(this).ColorPickerSetColor(this.value);
		}
	})
	.bind('keyup', function(){
		$j_mw(this).ColorPickerSetColor(this.value);
	});
	

});
