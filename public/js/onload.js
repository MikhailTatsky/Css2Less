/*
 * Copyright 2012 Thomas Pierson <contact@thomaspierson.fr> ,
 *                Nicolas Prat <nicooprat@gmail.com>
 *
 * This file is part of Css2Less Web Site.
 *
 * Css2Less Web Site is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Css2Less Web Site is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Css2Less Web Site.  If not, see <http://www.gnu.org/licenses/>.
 */

var timer;
var output;
var input;

$(document).ready(function() {
    
    // Editor
    
    var SCSSMode = require("ace/mode/scss").Mode;
    
    output = ace.edit("output");
    
    output.getSession().setMode(new SCSSMode());
    output.setShowPrintMargin(false);
    output.env.editor.renderer.setHScrollBarAlwaysVisible(false);
    output.insert('#hello {\n    color: blue;\n\n    #buddy {\n    	background: red;\n    }\n}');
    
    input = ace.edit("input");
    
    input.getSession().setMode(new SCSSMode());
    input.setShowPrintMargin(false);
    input.env.editor.renderer.setHScrollBarAlwaysVisible(false);    
    input.insert('#hello {\n    color: blue;\n}\n\n#hello #buddy {\n	background: red;\n}');
    input.getSession().on('change', convert);
    
    // Flip
    
    scroll2Top();
    
    $('#info').click(function(e)
    {
        if( $('body').hasClass('flip') )
        {
        	$('#book').css('display','block');
            setTimeout(function()
        	{
        	    $('body').removeClass('flip');
        	},10);
        }
        else
        {
        	setTimeout(function()
        	{
        	    $('#book').css('display','none');
        	},500);
            $('body').addClass('flip');
        }
        
        scroll2Top();
        e.preventDefault();
    });
  
});

function scroll2Top()
{
    $('html,body').animate({scrollTop:0}, 'slow');
}

function convert()
{
    // Reset timer
    if( timer ) clearTimeout( timer );
    
    // Get input & AJAX URL
    var term = input.getSession().getValue(),
        url = '/convert';
        
    // If input is not empty
    if( term )
    {
        // Start timer
        timer = setTimeout(function()
        {        
            // AJAX    
            $.post( url, { css: term },
                function( data ) {
                    // Set output
                    output.getSession().setValue( data );
                }
            );
        },500);
    }
    else
    {
        // Empty output
    	output.getSession().setValue( '' );
    }
}
