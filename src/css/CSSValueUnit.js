/**
 * Represents a single part of a CSS property value, meaning that it represents
 * just one part of the data between ":" and ";".
 * @param {String} text The text representation of the unit.
 * @class CSSValueUnit
 * @constructor
 */
function CSSValueUnit(text){
    
    /**
     * The text representation of the unit.
     * @type String
     * @property text
     */
    this.text = text;
    
    /**
     * Indicates the type of value unit.
     * @type String
     * @property type
     */
    this.type = "text";

    //figure out what type of data it is
    
    var temp;
    
    //it is a measurement?
    if (/^([+\-]?\d+)([a-z]+|%)?/i.test(text)){  //measurement
        this.type = "measurement";
        this.value = +RegExp.$1;
        this.units = RegExp.$2 || null;
    } else if (/^#([a-f0-9]{3,6})/i.test(text)){  //hexcolor
        this.type = "color";
        temp = RegExp.$1;
        if (temp.length == 3){
            this.red    = parseInt(temp.charAt(0)+temp.charAt(0),16);
            this.green  = parseInt(temp.charAt(1)+temp.charAt(1),16);
            this.blue   = parseInt(temp.charAt(2)+temp.charAt(2),16);            
        } else {
            this.red    = parseInt(temp.substring(0,2),16);
            this.green  = parseInt(temp.substring(2,4),16);
            this.blue   = parseInt(temp.substring(4,6),16);            
        }
    } else if (/^rgb\((\d+),(\d+),(\d+)\)/i.test(text)){ //rgb() color with absolute numbers
        this.type   = "color";
        this.red    = +RegExp.$1;
        this.green  = +RegExp.$2;
        this.blue   = +RegExp.$3;
    } else if (/^rgb\((\d+)%,(\d+)%,(\d+)%\)/i.test(text)){ //rgb() color with percentages
        this.type   = "color";
        this.red    = +RegExp.$1 * 255 / 100;
        this.green  = +RegExp.$2 * 255 / 100;
        this.blue   = +RegExp.$3 * 255 / 100;
    } else if (/^url\(["']?([^\)"']+)["']?\)/i.test(text)){ //URL
        this.type   = "url";
        this.url    = RegExp.$1;
    } else if (/^["'][^"']*["']/.test(text)){    //string
        this.type   = "string";
        this.string = eval(text);
    } else if (CSSColors[text.toLowerCase()]){  //named color
        this.type   = "color";
        temp        = CSSColors[text.toLowerCase()].substring(1);
        this.red    = parseInt(temp.substring(0,2),16);
        this.green  = parseInt(temp.substring(2,4),16);
        this.blue   = parseInt(temp.substring(4,6),16);         
    }


}

CSSValueUnit.prototype = {

    //restore constructor
    constructor: CSSValueUnit,
    
    /**
     * Returns the text representation of the unit.
     * @return {String} The text representation of the unit.
     * @method valueOf
     */
    valueOf: function(){
        return this.toString();
    },
    
    /**
     * Returns the text representation of the unit.
     * @return {String} The text representation of the unit.
     * @method toString
     */
    toString: function(){
        return this.text;
    }

};
