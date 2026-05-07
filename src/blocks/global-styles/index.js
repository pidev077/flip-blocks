/**
 * Import global styles.
 */

//add style global
import "./styles/style.scss";
import "./styles/editor.scss";
import "./button";
import "./focal-point";
import "./spacer";
import "./media-text";
import "./heading";

wp.domReady(function () {
	//unregister block
	wp.blocks.unregisterBlockType("core/separator");
	wp.blocks.unregisterBlockStyle("core/button", "default");
	wp.blocks.unregisterBlockStyle("core/button", "fill");
	wp.blocks.unregisterBlockStyle("core/button", "outline");
});
