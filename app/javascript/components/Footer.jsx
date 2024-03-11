import * as React from "react";

const Footer = () =>
  <div className="container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p>© 2024 Kevin Hurley</p>

      <p>
        Hey!  Thanks so much for stopping by and checking out swlcgdb.com.
        This application is considered an ALPHA release.  As in - things likely WILL break as you try to do things.

        Please report any bugs you find to <a href="https://github.com/kphurley/swlcgdb/issues">GitHub</a>.
      </p>

      <p>
        If you appreciate the work done here to create this resource, please consider donating to <a href="https://www.patreon.com/kphurley">my Patreon</a>.
        I promise every cent donated there will go towards the cost to keep the lights on for the site.
      </p>

      <p>
        Thanks, and enjoy!  --Kevin
      </p>
    </footer>
  </div>;

export default Footer;
