/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'colors', groups: [ 'colors' ] },
//		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];

	config.removeButtons = 'Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Source,Save,NewPage,Preview,Print,Templates,Copy,Cut,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Subscript,RemoveFormat,NumberedList,BulletedList,Outdent,Indent,Blockquote,CreateDiv,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Anchor,Unlink,Link,Styles,Format,Font,FontSize,BGColor,ShowBlocks,Maximize,About,Language';
	config.colorButton_colors = 'DF0101,088A4B,FFFF00,0080FF,190707';
	config.colorButton_enableMore = false;
	config.resize_enabled = false;
	config.height=350;
//	config.font_defaultLabel ='Open Sans';
//	config.font_names = 'font-family:Open Sans';
//	config.fontSize_sizes = '30px;';
//	config.extraCss += "body{font-family:Open Sans;} ";
};

//CKEDITOR.on('dialogDefinition', function( ev )
//        {
//            var dialogName = ev.data.name;
//            var dialogDefinition = ev.data.definition;
// 
//            switch (dialogName) {
//                case 'image': //Image Properties dialog
//                    dialogDefinition.removeContents('Link');
//                    dialogDefinition.removeContents('advanced');
//                    break;
//                /* case 'link': //image Properties dialog
//                    dialogDefinition.removeContents('advanced');
//                    break; */
//            }
//        });