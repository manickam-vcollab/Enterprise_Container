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
            <img src={vcollablogo}  style={{}} alt="" />
</div>
<div className={containerClasses.heading}>
    <h1>VCollab Privacy Policy</h1>

</div>
            </div>
     
            <div className={containerClasses.bodyContent} ><p>
                <h4>  ARTICLE I:     DEFINITIONS.  All defined terms are displayed in bold and italicized text. </h4>

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

                <h4>ARTICLE II: The Agreement between VCollab and Visitors of the Website</h4>

                &nbsp; &nbsp; <strong>  2.01</strong>   &nbsp;    Binding precondition.  Please read this Privacy Policy carefully.  This Privacy Policy governs how your Data can be used and accessed by VCollab.  Use of the Website  by you constitutes your acceptance to the terms and conditions of this Privacy Policy.  If you do not agree that Data submitted to the Website or used by VCollab and potentially third parties as constrained by the Privacy Policy, then you should not use or access the Website in any way.  If you do not agree to be bound by the terms of this Privacy Policy, you should not access the Website.<br /><br />

                &nbsp; &nbsp;<strong>  2.02</strong>   &nbsp;    Incorporation by Reference.  This Privacy Policy along with the TOU constitute the Agreement between all Visitors of the Website and VCollab.  If you do not want to be subject to terms and conditions set forth in the TOU and Privacy Policy, then you should not be accessing the Website.<br /><br />

                &nbsp; &nbsp;<strong>   2.03</strong>   &nbsp;   Amendments.  This Privacy Policy can be amended at the discretion of VCollab upon providing fourteen (14) days prior written notice on the Website.<br /><br />

                <h4> ARTICLE III: GENERAL APPROACH.</h4>

                &nbsp; &nbsp; <strong> 3.01 </strong>   &nbsp;    “Opt In” Basis.  The general approach of VCollab is to only obtain contact information information on an “opt in” basis.  Otherwise, Data is utilized solely for the purpose of enabling the functionality of the Website as made accessible to Visitors.<br /><br />

                &nbsp; &nbsp;<em> By way of examples:</em><br /><br />

                <li >       <em>Browsing Information</em> is captured as a matter of course through use of the Website, but such information is only used to enable Visitors to access the Content on the Website. </li> <br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <li>     <em>  Inputs </em>from<em>Visitors </em> shall be used by <em> VCollab</em>  to communicate with <em> Visitors</em>  about <em>  VCollab </em> product offerings, services, and events.  The most common form of Input is the contact information for a <em> Visitor</em> .</li> <br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   <li>   <em> Visitor</em> Data will not be provided to third-parties for marketing purposes unless the particular Visitor affirmatively requests for such information sharing.</li> <br />

                &nbsp; &nbsp;   <strong> 3.02 </strong> &nbsp;   Use of the Website.  The purpose of the Website is to help <em>Visitors</em> learn more about the events, products, and services of <em>VCollab</em>.  Visitors may use the Website to create an account with VCollab and/or to sign up to receive future communications from <em>VCollab</em>.

                <h4> ARTICLE IV: Information obtained about Visitors and Users.</h4>

                &nbsp; &nbsp;  <strong>  4.01   </strong> &nbsp; Types of<em> Data</em> that are captured and stored by the Technology.  The <em>Website</em> is used to make <em>Content</em> available to <em>Visitors</em>.   Other types of <em>Data</em>that are created, collected, and/or used by the <em>Technology</em> can include but are not limited to:<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   A.      <em>  Browser Information;</em> and<br /><br />

                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; B.        Contact information, messages, and other forms of <em> Visitor-supplied Inputs</em><br /><br />

                &nbsp; &nbsp; <strong> 4.02 </strong> &nbsp;   Use of Cookies. <em>  VCollab</em>  receives and stores certain types of information whenever <em> Visitors</em>  interact with the <em>  Website</em> .  For example, like many Web sites, the Website uses “cookies,” and we obtain certain types of information when your Web browser accesses the Website or advertisements and other content served by or on behalf of the Website on other Web sites.  Disabling the cookies on your computing device may interfere with your ability to take advantage of functionality provided on the <em>  Website</em> .

                <h4> ARTICLE V: Use of your Data by VCollab and the Technology.</h4>

                &nbsp; &nbsp;  Much of the <em>Data</em> and all of the <em>Browser Information</em> captured or created by the Technology is used to provide the functionality of the <em>Website</em> to the <em>Visitors</em> of <em>VCollab</em>.  Such <em>Data</em> will be used solely to provide the functionality of the Technology to the <em>Visitors</em> of <em>VCollab</em> unless otherwise permitted in this <em>Privacy Policy</em> <br /><br />

                &nbsp; &nbsp; <strong>   5.01 </strong> &nbsp; <em> Use of Contact Information.</em>  <em>VCollab</em> may use <em>Contact Information</em> to contact <em>Visitors</em> regarding developments with the Website and commercial offerings of<em> VCollab</em>.  This <em>Privacy Policy</em> may be amended in the future to permit the disclosure of <em>Contact Information</em> to third parties.   All <em>Visitors</em> to the <em>Website</em> are encouraged to opt in to receive communications from <em>VCollab </em> regarding present and future offerings.<br /><br />

                &nbsp; &nbsp; <strong>  5.02 </strong> &nbsp;<em> Use of Feedback.</em> <em> VCollab</em> may freely use the Website to capture and display Inputs relating to user feedback.  <em>VCollab </em> will not disclose personally identifiable informaiton about the individual providing the <em> Feedback</em> without their expressed consent.<br /><br />

                <h4> ARTICLE VI:</h4> &nbsp; &nbsp; Contact Us. If you have any questions or concerns about this <em>Privacy Policy</em>, please feel free to contact <em>VCollab</em> at <Link to="" style={{ color: "red" }}>support@VCollab.com.</Link>


            </p></div> </>
    )
}

export default Privacy