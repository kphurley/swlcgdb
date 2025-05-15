import * as React from "react";

const Footer = () =>
  <div className="container">
    <footer className="d-flex flex-column py-3 my-4 border-top">
      <div>© 2025 Kevin Hurley</div>

      <div>Hey!  Thanks so much for stopping by and checking out swlcgdb.com.</div>
      <div>
        Please report any bugs you find to <a href="https://github.com/kphurley/swlcgdb/issues">GitHub</a>.
      </div>

      <div>
        If you appreciate the work done here to create this resource, please consider donating <a href="https://www.paypal.com/donate/?hosted_button_id=DNXMG5TZS6WYS">via Paypal</a>.
        I promise every cent donated there will go towards the cost to keep the lights on for the site.
      </div>

      <div>
        Thanks, and enjoy!  --Kevin
      </div>
    </footer>
  </div>;

export default Footer;
