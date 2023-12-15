import React from 'react'
import { makeStyles } from "@material-ui/styles";
import { Link } from 'react-router-dom';
import vcollablogo from '../../../../assets/images/loginVCollabLogo.png'


const selectionStyle = makeStyles((theme: any) => ({
    bodyContent: {
        padding: "20px 250px 20px",
        overflow: "auto",
        maxHeight: "calc(100vh - 150px)",

        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body2.fontWeight,
        lineHeight: theme.typography.body2.lineHeight,
        color: theme.palette.text.primary,
        textAlign: "justify"

    },
    navbar: {
        height: "150px",
        position: "sticky",
        boxShadow: "0 0 2px 2px #c6c9cf",
        width: "100%",
        padding: 10
    },
    heading:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:25,
        color:"#1f1f1f"

      },
      title: {
        position: "absolute",
      
        top: 15,
        bottom: 0,
      right:150,
        margin: "auto 0 ",
        display:"inline-block",
    
        marginTop:50
      } ,

}))
const Privacy = () => {
    const containerClasses = selectionStyle();


    return (
        <> <div className={containerClasses.navbar}>
            <div className={containerClasses.title}>
<img src={vcollablogo}  alt="" />
</div>
<div className={containerClasses.heading}>
    <h1>VCollab Terms of Use</h1>

</div>

            </div>
  
            <div className={containerClasses.bodyContent} ><p>
                &nbsp; &nbsp;   <strong>  A. </strong>  <em>   “Agreement”</em>  means collectively: (1) the TOU; and (2) the Privacy Policy.<br /><br />

                &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;1. <em> “TOU”</em>  or <em> “Terms of Use”</em>  means the terms and conditions under which Visitors can access the Website.  If a Visitor does not agree to the TOU they should not be accessing the Website.<br /><br />

                &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;2.  <em>   “Privacy Policy”</em>  means this statement by Vcollab that sets forth the types of Data that VCollab collects through the use of the Website and what VCollab will and won’t do with that Data.<br /><br />

                &nbsp; &nbsp;   <strong>  B.  </strong>       <em> “Content”</em>  means any text, image, video, sound recording, etc. that is made accessible on the Website.<br /><br />

                &nbsp; &nbsp;<strong> C.  </strong>      <em>  “Data” </em> means collectively: (1) Browsing Information; and (2) Inputs.<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1.     <em>     “Browsing Information”</em>  means Data that is captured in the context of a Visitor interacting with a Website,through means such as cookies. Browsing Information includes but is not limited to the Internet protocol (IP) address used to connect your computer to the Internet; computer and connection information such as browser type, version, and time zone setting, browser plug-in types and versions, operating system, and platform; the full Uniform Resource Locator (URL) clickstream to, through, and from the Website, including date and time; cookie number; cookies, JavaScript to measure and collect session information, including page response times, download errors, length of visits to certain pages, page interaction information (such as scrolling, clicks, and mouse-overs), and methods used to browse away from the page.<br /><br />

                &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; 2.       <em>   “Input”</em>  means Data that is expressly submitted by a Visitor to the Website.  Examples of Inputs includes information submitted via an online form on the Website, information submitted through means such as e-mail, text messages, social media postings, etc.<br /><br />

                &nbsp; &nbsp;  <strong>   D.  </strong>      <em>  “Parties” </em> means the persons contracting with each other in the Agreement.<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; 1. <em>  “VCollab”</em>  means Visual Collaboration Technologies, a Texas corporation with offices at 800 East Campbell Rd, #388, Richardson, Tx 75081 and at 100 West Big Beaver,#200, Troy, MI 48084. <br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2. <em>   “Visitor” </em> means either a person or bot accessing the Website. <br /><br />

                &nbsp; &nbsp; <strong>   E. </strong>       <em>   “Website” </em> means the <em> www.vCollab.com</em>   homepage, and all web pages accessible through that homepage that share the same domain name.<br /><br />

                <h4> ARTICLE II: The Agreement between VCollab and Visitors of the Website  </h4>
                &nbsp; &nbsp; <strong>  2.01</strong>&nbsp;    Binding precondition.  Please read this <em>TOU carefully</em>.  This TOU, in conjunction with the Privacy Policy, governs how Visitors can interact with the Website.   Use of the Website by you constitutes your acceptance to the terms and conditions of this TOU and the Agreement.  If you do not agree to be bound by the terms of the Agreement, then you should not use the Website. <br /><br />
                &nbsp; &nbsp; <strong>  2.02</strong>&nbsp;    Incorporation by Reference.  This <em> Privacy Policy </em>along with the <em>TOU</em> constitute the Agreement between all Visitors of the Website and VCollab.  If you do not want to be subject to terms and conditions set forth in the <em>TOU </em>and <em>Privacy Policy</em>, then you should not be accessing the <em> Website</em>.<br /><br />

                &nbsp; &nbsp; <strong>   2.03</strong>&nbsp;   Amendments.  This <em> TOU</em> can be amended at the discretion of VCollab upon providing fourteen (14) days prior written notice on the <em>Website </em>.<br /><br />


                <h4> ARTICLE III : Access Rights and Restrictions</h4>

                &nbsp; &nbsp;<strong>   3.01  </strong>  &nbsp;  Grant.  <em> VCollab</em> and its suppliers grant you the Visitor a nonexclusive, nontransferable, revocable, and limited right to access the Website that is subject to full compliance with the terms of the Agreement  between  <em>VCollab</em> and you, <em>the Visitor</em>.<br /><br />

                &nbsp; &nbsp;<strong>  3.02  </strong>   &nbsp;   Prohibited Activities.  EXCEPT AS EXPRESSLY AUTHORIZED ABOVE, YOU THE <em> VISITOR</em> SHALL NOT: (a) COPY COPYRIGHTED MATERIAL PROVIDED ON THE <em> WEBSITE</em> AND/OR AND OTHER EMBODIMENT OF THE <em> WEBSITE</em>; (b) ENGAGE IN DENIAL OF SERVICE ATTACKS TO DISRUPT THE <em>WEBSITE</em>; (c) ATTEMPT TO UPLOAD MALWARE ONTO THE <em>WEBSITE</em>; (d) USE THE <em>WEBSITE</em> TO DISSEMINATE UNLAWFUL, MISLEADING, MALICIOUS, OR DISCRIMINATORY COMMUNICATIONS; OR (e) ENGAGE IN SPAMMING, PHISHING, OR SIMILAR ACTIVITIES TO OR USING the <em>WEBSITE</em>.<br /><br />

                &nbsp; &nbsp;<strong> 3.03 </strong>   &nbsp;     Reservation of Rights.  By using, you the visitor acknowledge and agree that all intellectual property rights to the Website are retained by <em> VCollab</em>  and/or its suppliers.  Except for the access grant provided in Section 3.01 above, <em> VCollab</em>  and/or its suppliers retain ownership of all intellectual property rights  in the <em>  Website</em> .<br /><br />

                <h4> ARTICLE IV: WARRANTY DISCLAIMERS AND DAMAGES EXCLUSIONS</h4>

                &nbsp; &nbsp;<strong>  4.01 </strong>  &nbsp;      “AS IS” and “AS AVAILABLE”.  EXCEPT FOR EXPRESS WARRANTIES (IF ANY) PROVIDED ELSEWHERE IN THE AGREEMENT), THE WEBSITE DATA AND ITS CONTENT  ARE MADE AVAILABLE TO <em>  VISITORS</em>  BY <em> VCOLLAB</em>  AND ITS SUPPLIERS ON AN “AS IS” AND “AS AVAILABLE” BASIS. UNLESS OTHERWISE SPECIFIED IN WRITING. <em> VCOLLAB</em>  MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE <em>  WEBSITE</em> . EACH <em> VISITOR </em> EXPRESSLY AGREES THAT USE OF THE <em> WEBSITE</em>  IS AT THE SOLE RISK OF <em> VISITOR</em> .<br /><br />

                &nbsp; &nbsp;<strong>  4.02   </strong>   &nbsp;     DISCLAIMER OF WARRANTIES.  UNLESS OTHERWISE SPECIFIED ELSEWHERE IN THIS AGREEMENT, MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE <em>WEBSITE</em>.  <em>VISITOR</em> EXPRESSLY AGREES THAT USE OF THE WEBSITE IS AT THE SOLE RISK OF <em> VISITOR</em>.  TO THE FULL EXTENT PERMISSIBLE BY LAW,<em> VCOLLAB</em> DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.<em> VCOLLAB</em> DOES NOT WARRANT THAT THE <em>WEBSITE</em> OR CONTENT ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. TO THE FULL EXTENT PERMISSIBLE BY LAW, <em>VCOLLAB</em> WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF ANY <em>WEBSITE</em>, UNLESS OTHERWISE SPECIFIED IN WRITING.<br /><br />

                &nbsp; &nbsp;<strong>  4.03  </strong>   &nbsp;     Exclusive Remedy.   To the extent that the <em> Website</em>  and/or <em> Website</em>  breach any warranty, the exclusive remedy of <em> Visitor</em>  shall be the repair and/or replacement of the <em> Websit</em> .    To the extent that this exclusive remedy is deemed to have failed of its essential purpose, <em> Visitor’s </em> recovery shall be limited to terminating use of the <em> Website</em> .  If a <em> Visitor</em>  is dissatisfied with the <em> Website</em> , the <em> Visitor</em>  can and should terminate the <em> Agreement</em>  and cease use of the <em> Website</em> <br /><br />

                &nbsp; &nbsp;<strong> 4.04 </strong>    &nbsp;    Damages Exclusions.  Except for the indemnification obligations set forth below, neither Party shall be liable to the other party for lost profits, cost of procuring substitute technologies, or any special, incidental, consequential, or indirect damages arising out of this Agreement.<br /><br />

                &nbsp; &nbsp;<strong>  4.05 </strong>   &nbsp;      Liability Limitations.  The liabilities of both Parties pursuant to this Agreement are capped at the fees (if any) paid by Visitor to VCollab during the month before the event(s) resulting in the liability.  This liability limitation does not apply to fees owed by Visitor to VCollab.<br /><br />

                &nbsp; &nbsp;<strong>   4.06 </strong>  &nbsp;     Indemnification.  The Visitor shall indemnify, defend and hold VCollab harmless from all claims by a third party relating to arising from a breach of this Agreement by the Visitor.<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;  A.        Notification. VCollab must provide written notice to the Visitor that in a reasonably timely manner.  Failure to provide timely notice shall not excuse the Visitor of its obligations except to the extent that such delay actually impacts the end result.  Notice provided with ninety (90) days after the VCollab has actual knowledge of a claimshall be deemed reasonably timely.<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;  B.        Ongoing Obligations.  The Visitor shall bear full responsibility for all claims and shall pay all attorneys’ fees and expenses incurred in connection with such claims as and when incurred; provided, however, that (i) the Visitor shall keep the VCollab informed of, and consult with the VCollab in connection with, the progress of each claim; and (ii) Visitor shall not have any right, without the VCollab’s written consent (which consent shall not be unreasonably withheld or delayed), to settle any claim if such settlement arises from or is part of any criminal action, suit or proceeding or contains a stipulation to or admission or acknowledgment of, any liability or wrongdoing (whether in contract, tort or otherwise) on the part of the VCollab.  Notwithstanding any of the foregoing, the Visitor shall have the right, in its absolute discretion, to employ attorneys of its own choice and to institute or defend any claim at its own expense.<br /><br />

                <h4>  ARTICLE V: GENERAL PROVISIONS</h4>

                &nbsp; &nbsp;<strong>   5.01 </strong>    &nbsp;   Interpretation.<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;   A.        Severability.  If any part, term, or provision of this Agreement is found illegal or in conflict with any valid controlling law, the validity of the remaining provisions will not be affected thereby.  In the event that the legality of any provision of this Agreement is brought into question because of a change in applicable law, the Parties shall communicate openly with each other in a good faith manner to reconcile the change in Law with the provisions of this Agreement.<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;   B.        Waiver.  The waiver of a breach of this Agreement may only occur by an express writing signed by the waiving Party.  Such a written waiver will not constitute a waiver of any other breach.<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;   C.        Integration.  The Agreement represents the entire understanding between the Parties. This Agreement supersedes all other agreements between the Parties that relates in any way to the Content and the Website.  All (if any) prior agreements, drafts, representations, statements, negotiations, marketing materials, and undertakings relating to the subject matter of this Agreement are hereby superseded by this Agreement.<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;   D.        Conflicts. All reasonable efforts shall be made to interpret the provisions of this Agreement in such a manner that are consistent with each other.  No provision in any Agreement document shall be interpreted in a manner such that it conflicts with any applicable law.<br /><br />

            
                &nbsp; &nbsp;<strong>     5.02 </strong>  &nbsp;     Dispute Resolution/Adjudication.<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;     A.        Governing Law.  The Agreement is governed exclusively by the substantive laws of the State of Michigan (without regard to its law of conflicts).<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;   B.        Venue. All disputes arising pursuant to this Agreement must be exclusively litigated in the federal courts located in the Eastern District of Michigan, or alternatively, in the state courts located in Wayne County, Michigan.<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;  C.        Purposeful Availment.  By availing to access the Website, Visitors purposely avail themselves to the provisions set forth above in this Section 5.02.  Both Parties agree the adjudication of any dispute in the state of Michigan is not an inconvenient forum for either Party.<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;  D.        Exclusions.  The United Nations Convention on Contracts for the International Sale of Goods (CISG) and the Uniform Computer Information Transactions Act (UCITA) do not apply in any way to this Agreement.<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;   E.         Attorney Fees and Litigation Costs.  In a dispute between the Parties, the Party that prevails, or at least substantially prevails, against the other Party may recover its reasonable litigation expenses.  Such litigation expenses shall include reasonable attorney fees, court costs, expert witness fees, and other related out of pocket expense from the non-prevailing Party.<br /><br />

                &nbsp; &nbsp;<strong>    5.03 </strong>  &nbsp;    Assignments.  This Agreement imposes personal obligations on the Parties.  Neither Party may assign this Agreement without the express written consent of the other Party.  Such consent may be withheld for any reason or for no reason at all.  Any attempt by either Party to assign any or all of its rights pursuant to this Agreement is null and void ab initio.  Either Party may assign this Agreement upon providing written notice to the non-assigning Party without the permission of the non-assigning Party in the context of a merger, acquisition, or divestiture involving all or substantially all of the assigning Party’s assets.<br /><br />

                &nbsp; &nbsp;<strong>   5.04  </strong>   &nbsp;    Relationship of the Parties.<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; A.        No Agency, Partnership, or Employer Relationship.  Nothing in this Agreement or any circumstances associated with it or its performance give rise to any relationship of agency, partnership or employer and employee between Parties or their Personnel.<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; B.        No Third-Party Beneficiaries.  There are no third-party beneficiaries to this Agreement.  No person who is not a party to this Agreement will have any rights pursuant to the Contracts (Rights of Third Parties) Act 1999 to enforce any term of this Agreement.<br /><br />

                &nbsp; &nbsp;<strong>   5.05 </strong>    &nbsp;    Force Majeure.  Neither Party will be liable for any default or delay in performance of its obligations under the Agreement if and to the extent the default or delay is caused, directly or indirectly, by a force majeure event that is outside the reasonable control of the Party.<br /><br />

                &nbsp; &nbsp;<strong>    5.06 </strong>     Currency.  All Fees payable pursuant to this Agreement shall be paid in U.S. Dollars unless otherwise specified.<br /><br />

                &nbsp; &nbsp;<strong>  5.07  </strong>   Date/Time. For all purposes for which the date or time is to be determined pursuant to this Agreement, the applicable date and time are the date and time in Detroit, Michigan.<br /><br />

                <h4> ARTICLE VI:</h4> Contact Us. If you have any questions or concerns about this Agreement, or if you wish to report an instance of copyright infringement please feel free to contact VCollab at <Link to="" style={{color:"red"}}>support@VCollab.com.</Link>


            </p></div> </>
    )
}

export default Privacy