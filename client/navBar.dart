import 'dart:html';

void main()
{
  print("Started Main");

  /*main nav bar element*/
  Element navBar = query('#myNavBar');
  navBar.classes.add("navbar navbar-default navbar-fixed-top");
  navBar.attributes['role'] = "navigation";

  /*create the nav container and ad it to th main nav */
  Element navContainer = new Element.html('<div class="container"></div>');
  navBar.children.add(navContainer);

  print("starting to create header..");
  var projectName = "My Tube";
  Element navHeader = new Element.html(
  """
  <div class="navbar-header">
    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a id="brand" class="navbar-brand" href="#">${projectName}</a>
  </div>
  """);
  navContainer.children.add(navHeader);

  Element navCollapse = new Element.html(
  """
  <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li id="homeLi" class="active"><a id="homeLink" href="#">Home</a></li>
            <li id="aboutLi"><a id="aboutLink" href="about.html">About</a></li>
          </ul>
        </div><!--/.nav-collapse -->
  """
  );

  navContainer.children.add(navCollapse);

  var meta = query("#pageNumber");
  var pageNumber = meta.attributes['content'];
  if (pageNumber == "2")
  {
    /* chahge the links*/
    query('#brand').attributes['href'] = "index.html";
    query('#homeLink').attributes['href'] = "index.html";
    query('#aboutLink').attributes['href'] = "#";
    query('#homeLi').classes.remove("active");
    query('#aboutLi').classes.add("active");
  }
}