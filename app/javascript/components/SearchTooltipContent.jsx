import React from "react";

const SearchTooltipContent = ({ assumeFilterButtons }) =>
  <div>
    <p className="lh-sm">You can use codes to filter your search</p>
    <div className="lh-sm">For example, an input of</div>
    <div className="lh-sm">&nbsp;&nbsp;c:2,f:1,x:jedi,Luke</div>
    <div className="lh-sm">should translate to:</div>
    <div className="lh-sm">&nbsp;&nbsp;cost: 2, force pip's: 1, text contains "jedi", name contains "Luke"</div>
    <p className="lh-sm"></p>
    <div className="lh-sm">Supported options:</div>
    <div className="lh-sm">&nbsp;&nbsp;a:affiliation</div>
    <div className="lh-sm">&nbsp;&nbsp;b:blast_damage</div>
    <div className="lh-sm">&nbsp;&nbsp;c:cost</div>
    <div className="lh-sm">&nbsp;&nbsp;f:force</div>
    <div className="lh-sm">&nbsp;&nbsp;h:damage_capacity (health)</div>
    <div className="lh-sm">&nbsp;&nbsp;k:traits</div>
    <div className="lh-sm">&nbsp;&nbsp;o:tactics</div>
    <div className="lh-sm">&nbsp;&nbsp;r:resources</div>
    <div className="lh-sm">&nbsp;&nbsp;s:side</div>
    <div className="lh-sm">&nbsp;&nbsp;t:type</div>
    <div className="lh-sm">&nbsp;&nbsp;u:unit_damage</div>
    <div className="lh-sm">&nbsp;&nbsp;x:text</div>
    <p className="lh-sm"></p>
    { assumeFilterButtons && <div className="lh-sm">This is in addition to whatever filters you've selected above.</div> }
  </div>;

export default SearchTooltipContent;
