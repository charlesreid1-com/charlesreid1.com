var body = $('body');
var Nsections = 5;

var img_file = 'flickr6.jpg';


//////////////////////////////////
//
// File is laid out as follows:
//
// Part 0 - Add Jumbotron
//
// Part 1 - Add services sections to page
//
// Part 2 - Add about section to page
//
// Part 3 - Add footer to page
//
// /////////////////////////////






//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//
// Part 1
// Add Services sections 



// ----------------------------------
// First, define a function that turns
// bits of information into a 
// fully-formed div section
// describing a dox service.

function make_services_section(idx, title, text, link_target, link_text) {
    /// Parameters:
    /// idx - numerical index of which section number
    /// title - the title text for this section
    /// text - an array of paragraphs describing this section
    /// link_target - target of link button for this section
    /// link_text - text for link button for this section
    ///
    /// Returns:
    /// a jQuery object representing <div> section
    /// containing the section title/text/link.

    var ip1 = idx+1;

    var page = $('div#skrollr-body');


    // -----
    // The Section
    // (this is what is returned)

    var section = $("<div />", {
        "class" : cls,
        "id" : "doxSection"+ip1
    });

    var cont = $("<div />", {
        "class" : "container"
    })
    .appendTo(section);

    var row1 = $("<div />", {
        "class" : "row",
        "id" : "doxSection"+ip1
    })
    .appendTo(cont);

    var anchor = $("<a />", {
        "name" : "a_"+link_target,
        "class" : "myanchor"
    }).html("<p>&nbsp;</p>")
    .appendTo(row1);

    var content1 = $("<div />", {
        "class" : "col-md-6"
    })
    .appendTo(row1);


    // -----
    // Heading

    // title
    var title = $("<h2 />", {
        "class" : "contentHeader",
        "id" : "doxSection"+ip1+"_head"
    })
    .text(title)
    .appendTo(content1);

    // each paragraph
    text.forEach( function(d) { 
        var txt = $("<p />", {
            "class" : "lead contentText"
        })
        .html(d)
        .appendTo(content1);
    });

    // link stuff
    var linktxt = $("<p />")
    .appendTo(content1);

    var link = $("<a />", {
        "href" : "#a_"+link_target,
        "target" : "_blank",
        "class" : "btn btn-large btn-primary"
    })
    .html(link_text + '&nbsp;&nbsp;<i class="fa fa-arrow-circle-o-right"></i>')
    .appendTo(linktxt);


    // -----
    // Return

    return section;
}




// --------------------------------------------
// Define an array that will store all bits of info
// about each section 

var all_sections = [];

all_sections.push({});

// Technical editing
moo = {};
moo['title']        = "Technical Editing";
moo['btn_text']     = "Technical<br />Editing";
moo['link_target']  = 'techedit';
moo['link_text']    = "Get in touch with Doxuments about your technical editing needs";
moo['text']         = [ "Doxuments provides technical editing services for all manner of technical content: scientific journal articles, textbooks, dissertations, or software manuals. Our technical editing services range from ensuring compliance with a publisher's printing standards, to improving writing quality, cross-referencing research, and double-checking mathematical equations for consistency. Effective technical communication has many facets; Doxuments has them all covered.",
                        "Doxuments uses the Levels of Edit system, adopted from the Jet Propulsion Laboratory, to adjust the extent of editing based on timelines and budgets. The Levels of Edit system lets customers know exactly what to expect."
                        ];
all_sections.push(moo);

// Document formats
moo = {};
moo['title']        = "Document Formats";
moo['btn_text']     = 'Document<br/>Formats';
moo['link_target']  = 'doctypes';
moo['link_text']    = "Contact Doxuments about your project requirements";
moo['text']         = [ "In today's technology-saturated world, there are dozens of document formats to deal with. Doxuments is a Babelfish for technical documents: we can handle any technical document format, ranging from Word to Latex, PDF to HTML, Matlab script comments or inline Python documentation, even optical character recognition for scanned images of documents, and turn them into any format you want.",
                        "Whether you're writing a graduate-level mathematics textbook, converting your dissertation from Word to Latex, or documenting a huge code base, Doxuments has you covered."
                        ];
all_sections.push(moo);

// Compositing and Typesetting
moo = {};
moo['title']        = "Compositing and Typesetting";
moo['btn_text']     = 'Compositing<br />& Typesetting';
moo['link_target']  = 'compositing';
moo['link_text']    = "Let Doxuments take care of your typesetting and layout needs";
moo['text']         = [ "Dox Consulting provides services for document compositing, typesetting, and layouts. Compositing, consisting of the final arragement of elements on a page, often requires intricate knowledge of the format being used, whether it be Latex or HTML/CSS/Javascript. Typesetting consists of the arragement of the final, composited material for the desired print layout, which includes page margins, text and line spacing, header spacing, as well as more esoteric aspects like orphans, widows, and ragged bottoms.",
                        "Dox helps edit documents to meet the stringent standards of printers and publishers, preparing documents so they're ready to send to the printer. Dox builds custom webpages from the ground up using HTML, CSS, Javascript, and modern web technologies, using these features to control document layout."
                        ];
all_sections.push(moo);

// Design
moo = {};
moo['title']        = "Document Design";
moo['btn_text']     = 'Document<br />Design';
moo['link_target']  = 'design';
moo['link_text']    = "Get document template and style guide help from Doxuments";
moo['text']         = [ "Dox Consulting offers design services for documents and document templates, including letterhead, technical report templates, experiment reports, even books. Dox can also create style guides for companies, laboratories, and departments. Let our design services bring order to your company's document chaos - Dox Consulting has the expertise and experience to know how to do it right.",
                        "Templates help your documents and presentations communicate with power. Style guides give you a uniform voice so you can focus on your content. Let Dox empower your technical communications with our document design services."
                        ];
all_sections.push(moo);

// Automation and scripting
moo = {};
moo['title']        = "Automation and Scripting";
moo['btn_text']     = 'Automation<br />& Scripting';
moo['link_target']  = 'autoscript';
moo['link_text']    = "Make all of your wildest technical documents dreams come true";
moo['text']         = [ "Authoring and preparing documents for publication and distribution can be a tedious process. Going from completed experiments to finished reports can take a lot of effort, much of it consisting of the trivial tasks of document preparation. Documents can have lots of equations, figures, tables, variable definitions, or a dense index, all creating headaches for the author. Dox offers services to automate report generation and make figure processing headaches disappear with a few lines of scripting. We also help get your code to self-document, allowing you to always have the freshest documentation available."
                        ];
all_sections.push(moo);






// ---------------------------------------
// for loop to add services sections 
// and spacer gaps

for( var i=0; i<Nsections+1; i++) {
    // counter:
    // 0 is title section and first gap
    // 1-5 are remaining text sections and their corresponding gaps

    var cls;
    var txt;

    var page = $('div#skrollr-body');

    if(i==0) {

        // ----------------
        // This is the first time through,
        // so add a large gap div, 
        // and put the jumbotron on top 

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        //
        // Part 0
        // Add Jumbotron

        var width = "100";

        var gap = $("<div />", {
            "class" : "gap gap-"+width,
            "style" : "background-image:url({{ SITEURL }}/images/"+img_file+")"
        }).appendTo(page);

        var lead_text = ["Doxuments provides technical editing and document publication services ",
                         "from a chemical engineering Ph.D. with national laboratory and industrial experience. "
                        ];

        var narrow_jumbotron = [
            '<div class="container">',
            '  <div class="cosmojumbo">',
            '    <h1 class="cosmojumboTitle"><b>Doxuments</b> Technical Editing &amp; Publishing Services</h1>',
            '    <p class="cosmolead cosmojumboText">',
            lead_text.join(''),
            '    </p>',
            '    <p>'];

        all_sections.forEach(function(d,j) {
            if(j>0){
                narrow_jumbotron.push('       <a class="btn btn-success" href="#a_' + d['link_target'] + '" role="button">' + d['btn_text'] + '</a>');
            }
        });
        narrow_jumbotron.push("</p>");

        narrow_jumbotron.push("<p>");
        narrow_jumbotron.push('       <a class="btn btn-primary" href="#a_about" role="button">About Us</a>'); 
        narrow_jumbotron.push('       <a class="btn btn-primary" href="#a_contact" role="button">Contact Us</a>'); 
        narrow_jumbotron.push("</p>");

        narrow_jumbotron.join([
            '  </div>',
            '</div>'
        ]);

        //console.log(narrow_jumbotron.join(''));
        gap.append(narrow_jumbotron.join(''));

        //
        ////////////////////////////////////////////////////


    } else {

        // ----------------
        // This is the second time through,
        // so add a services section div, 
        // then a small gap div

        var width = "50";

        cls = "content content-padded";

        section_info = all_sections[i];

        var section = make_services_section(i,
                        section_info['title'],
                        section_info['text'],
                        section_info['link_target'],
                        section_info['link_text']);

        section.appendTo(page);

        var gap = $("<div />", {
            "class" : "gap gap-"+width,
            "style" : "background-image:url({{ SITEURL }}/images/"+img_file+")"
        }).appendTo(page);
    }

}

/// --------------------------------------------
// add background images to page
//
// (this is redundant, and confusing, 
//  but its how the example was done.
//  okay for now, but it is a mess.)

for(var i=0; i<Nsections+1; i++) {
    // Counter:
    // this loops over each gap, not over each section.

    var ip1 = i+1;

    var width;
    var pct_a;
    var pct_b;

    var targ;

    if(i==0) {
        width = "100";
        pct_a = "200";
        pct_b = "80"; //controls scrolling speed
        //targ = "#skrollr-whatever";//#doxSection"+ip1+" + .gap"
        targ = "body";//#doxSection"+ip1;
    } else {
        width = "50";
        pct_a = "300";
        pct_b = "60"; // controls scrolling speed
        targ = "#doxSection"+ip1+" + .gap";
    }

    var parallax_wrapper = $("<div />",{
        "class" : "parallax-image-wrapper parallax-image-wrapper-"+width,
        "data-anchor-target" : targ,
        "data-bottom-top" : "transform:translate3d(0px, "+pct_a+"%, 0px)",
        "data-top-bottom" : "transform:translate3d(0px,   0%, 0px)"
    }).prependTo(body);

    var parallax = $("<div />",{
        "class" : "parallax-image parallax-image-"+width,
        "style" : "background-image:url({{ SITEURL }}/images/"+img_file+")",
        "data-anchor-target" : targ,
        "data-bottom-top" : "transform:translate3d(0px, -"+pct_b+"%, 0px)",
        "data-top-bottom" : "transform:translate3d(0px,  "+pct_b+"%, 0px)"
    }).appendTo(parallax_wrapper);

};




//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//
// Part 2 - Add About section

function make_about_section() {
    /// Returns:
    /// a jQuery object representing <div> section 
    /// containing the about me section.
    
    var page = $("div#skrollr-body");


    // -----
    // The section
    // (this is what is returned)

    var section = $("<div />", {
        "class" : cls,
        "id" : "aboutSection"
    });

    var cont = $("<div />", {
        "class" : "container"
    })
    .appendTo(section);

    // -----
    // Heading row

    var row = $("<div />", {
        "class" : "row",
        "id" : "about"
    })
    .appendTo(cont);

    var anchor = $("<a />", {
        "name" : "a_about",
        "class" : "myanchor"
    }).html("<p>&nbsp;</p>")
    .appendTo(row);

    var content = $("<div />", {
        "class" : "col-md-6"
    })
    .appendTo(row);

    // title
    var title_text = "About Doxuments";
    var title = $("<h2 />", {
        "class" : "contentHeader",
        "id" : "aboutSection_head"
    })
    .text(title_text)
    .appendTo(content);


    // -----
    // Info row

    var row = $("<div />", {
        "class" : "row",
        "id" : "about"
    })
    .appendTo(cont);

    var content = $("<div />", {
        "class" : "col-sm-6"
    })
    .appendTo(row);

    // title
    var stuff= ["Doxuments Services is an arm of Dox Consulting, LLC, operated by Charles Reid.",
                "Charles Reid is a chemical engineering Ph.D. with experience working at two national labs and a petrochemical technology startup. In addition to his experience modeling chemical reactions on supercomputers, he is also an expert in Unix, Python, Latex, and web technologies.",
                "Charles offers unmatched expertise and practical know-how to help you get your technical documents edited, revised, cleaned, and ready for publication.",
                ];
    stuff.forEach(function(d){
        var p = $("<p />", {
            "class" : "lead contentText"
        }).text(d)
        .appendTo(content);
    });

    var imgdiv = $("<div />", {
        "class" : "col-sm-6"
    })
    .appendTo(row);

    // use some jquery event binding to make image change on hover
    var img = $("<img />", {
        "class" : "img img-circle",
        "id" : "imageofme",
        "width" : "300px",
        "height" : "300px",
        "src" : "{{ SITEURL }}/images/me_left.jpg",
        "data-alt-src" : "{{ SITEURL }}/images/me_right.jpg"
    })
    .appendTo(imgdiv);

    var sourceSwap = function () {
        var $this = $(this);
        var newSource = $this.data('alt-src');
        $this.data('alt-src', $this.attr('src'));
        $this.attr('src', newSource);
    }

    $(function () {
        $('img#imageofme').hover(sourceSwap, sourceSwap);
    });



    // -----
    // Return

    return section;
}


// ---------------------------------------
// for loop to add about sections 
// and spacer gaps

var txt;
var width = "50";
var page = $('div#skrollr-body');
var cls = "content content-padded";

var section = make_about_section();
section.appendTo(page);

var gap = $("<div />", {
    "class" : "gap gap-"+width,
    "style" : "background-image:url({{ SITEURL }}/images/"+img_file+")"
}).appendTo(page);


/// --------------------------------------------
// add background images 

console.log(img_file);
console.log("{{ SITEURL }}/images/"+img_file);

pct_a = "300";
pct_b = "60"; // controls scrolling speed
targ = "#aboutSection + .gap";

var parallax_wrapper = $("<div />",{
    "class" : "parallax-image-wrapper parallax-image-wrapper-50",
    "data-anchor-target" : targ,
    "data-bottom-top" : "transform:translate3d(0px, "+pct_a+"%, 0px)",
    "data-top-bottom" : "transform:translate3d(0px,   0%, 0px)"
}).prependTo(body);

var parallax = $("<div />",{
    "class" : "parallax-image parallax-image-50",
    "style" : "background-image:url({{ SITEURL }}/images/"+img_file+")",
    "data-anchor-target" : targ,
    "data-bottom-top" : "transform:translate3d(0px, -"+pct_b+"%, 0px)",
    "data-top-bottom" : "transform:translate3d(0px,  "+pct_b+"%, 0px)"
}).appendTo(parallax_wrapper);
/*
*/





//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//
// Part 3 - Add Contact section

function make_contact_section() {
    /// Returns:
    /// a jQuery object representing <div> section 
    /// containing the about me section.
    
    var page = $("div#skrollr-body");


    ////////////////////////////////
    // The section
    // (this is what is returned)

    var section = $("<div />", {
        "class" : cls,
        "id" : "contactSection"
    });

    var cont = $("<div />", {
        "class" : "container"
    })
    .appendTo(section);

    ////////////////////////////////
    // Heading row

    var row = $("<div />", {
        "class" : "row",
        "id" : "contact"
    })
    .appendTo(cont);

    var anchor = $("<a />", {
        "name" : "a_contact",
        "class" : "myanchor"
    }).html("<p>&nbsp;</p>")
    .appendTo(row);

    var content = $("<div />", {
        "class" : "col-md-6"
    })
    .appendTo(row);

    // title
    var title_text = "Contact Doxuments";
    var title = $("<h2 />", {
        "class" : "contentHeader",
        "id" : "contactSection_head"
    })
    .text(title_text)
    .appendTo(content);


    ////////////////////////////////
    // Info row

    var row = $("<div />", {
        "class" : "row",
        "id" : "contact"
    })
    .appendTo(cont);

    var content = $("<div />", {
        "class" : "col-sm-4"
    })
    .appendTo(row);


    function make_panel(title_text,html_contents) {
        // Parameters:
        // title_text: text that goes in the panel title bar
        // html_contents: html that goes in the panel body

        var panel = $("<div />", {
            "class" : "panel panel-primary"
        });


        // -----
        // panel head
        var panel_heading = $("<div />", {
            "class" : "panel-heading"
        }).appendTo(panel);

        var title = $("<h3 />", {
            "class" : "panel-title"
        })
        .text(title_text)
        .appendTo(panel_heading);


        // -----
        // panel body
        var panel_body = $("<div />", {
            "class" : "panel-body"
        })
        .html(html_contents)
        .appendTo(panel);


        return panel;

    }


    ////////////////////////////////
    // Panels: email, phone number, address
    //
    var email_panel = make_panel("Email","info@doxuments.com");
    email_panel.appendTo(content);

    var phone_panel = make_panel("Phone","+1 (888) 998-2832");
    phone_panel.appendTo(content);

    var address_panel = make_panel("Address","Doxuments (an arm of Dox Consulting, LLC)<br/>3518 Fremont Avenue North #521<br />Seattle, WA 98103");
    address_panel.appendTo(content);

    var tweet_panel = make_panel("Twitter","Tweet at us: <a href='http://twitter.com/doxconsulting'>@doxconsulting</a>");
    tweet_panel.appendTo(content);



    ///////////////////////////
    // Contact form

    /*

    var form_content = $("<div />", {
        "class" : "col-sm-4",
        "style" : "text-align: center;"
    })
    .appendTo(row);

    var form = $("<form />", {
        "class" : "form-horizontal"
    }).appendTo(form_content);



    // ------------
    // form element #1: 
    // email address
    var divform = $("<div />", {
        "class" : "form-group"
    }).appendTo(form);

    // form label
    var lab = $("<label />", {
        "for" : "inputEmail",
        "class" : "col-lg-2",
        "control-label" : ""
    }).text("Email")
    .appendTo(divform);

    // form input
    var divinput = $("<div />", {
        "class" : "col-lg-10"
    }).appendTo(divform);

    var input = $("<input />", {
        "type" : "text",
        "class" : "form-control",
        "id" : "inputEmail",
        "placeholder" : "Email"
    }).appendTo(divinput);


    */



    ///////////////////////////
    // Map images

    var img_content = $("<div />", {
        "class" : "col-sm-8",
        "style" : "text-align: center;"
    })
    .appendTo(row);

    var img_panel = make_panel("Location","");
    img_panel.appendTo(img_content);

    var p = $("<p />", {
        "class" : "lead contentText"
    })
    .html("Serving clients in Seattle and the San Francisco Bay Area. <br />")
    .appendTo(img_panel);




    var size = "250";

    var img = $("<img />", {
        "class" : "img img-circle",
        "width" :  size+"px",
        "height" : size+"px",
        "src" : "{{ SITEURL }}/images/seattle.png"
    })
    .appendTo(img_panel);


    var space = $("<span/>", {
        "style" : "padding: 10px;"
    })
    .html("&nbsp;")
    .appendTo(img_panel);


    var img = $("<img />", {
        "class" : "img img-circle",
        "width" :  size+"px",
        "height" : size+"px",
        "src" : "{{ SITEURL }}/images/bayarea.png"
    })
    .appendTo(img_panel);

    var br = $("<p  />")
    .appendTo(img_panel);



    // 
    ///////////////////////////////



    // -----
    // Return

    return section;
}


// ---------------------------------------
// for loop to add contact sections 
// and spacer gaps

var txt;
var width = "50";
var page = $('div#skrollr-body');
var cls = "content content-padded";

var section = make_contact_section();
section.appendTo(page);

var gap = $("<div />", {
    "class" : "gap gap-"+width,
    "style" : "background-image:url({{ SITEURL }}/images/"+img_file+")"
}).appendTo(page);


/// --------------------------------------------
// add background images 

pct_a = "300";
pct_b = "60"; // controls scrolling speed
targ = "#contactSection + .gap";

var parallax_wrapper = $("<div />",{
    "class" : "parallax-image-wrapper parallax-image-wrapper-50",
    "data-anchor-target" : targ,
    "data-bottom-top" : "transform:translate3d(0px, "+pct_a+"%, 0px)",
    "data-top-bottom" : "transform:translate3d(0px,   0%, 0px)"
}).prependTo(body);

var parallax = $("<div />",{
    "class" : "parallax-image parallax-image-50",
    "style" : "background-image:url({{ SITEURL }}/images/"+img_file+")",
    "data-anchor-target" : targ,
    "data-bottom-top" : "transform:translate3d(0px, -"+pct_b+"%, 0px)",
    "data-top-bottom" : "transform:translate3d(0px,  "+pct_b+"%, 0px)"
}).appendTo(parallax_wrapper);






//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//
// Part 4 - Add Footer






