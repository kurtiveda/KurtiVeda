"use client";
import Link from "next/link";
import React from "react";
import "./style.css";

function page() {
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl  font-playfair my-10">Privacy Policy</h1>
      <hr className="w-[90%]" />
      <div className="font-lato laptop:w-[50%] tablet:w-[90%] xsPhone:w-full xsPhone:px-4 text-justify space-y-6 tracking-wide text-sm my-12">
        <p>
          This privacy notice for Tara Enterprises
          <b>(&apos;we&apos;, &apos;us&apos;, or &apos;our&apos;)</b>, describes
          how and why we might collect, store, use, and/or share
          <b>(&apos;process&apos;)</b> your information when you use our
          services
          <b> (&apos;Services&apos;)</b>, such as when you:
        </p>
        <h2 className="text-md font-bold">
          1. WHAT INFORMATION DO WE COLLECT?
        </h2>
        <h3>Personal information you disclose to us</h3>
        <p>In Short: We collect personal information that you provide to us.</p>
        <p>
          We collect personal information that you voluntarily provide to us
          when you register on the Services, express an interest in obtaining
          information about us or our products and Services, when you
          participate in activities on the Services, or otherwise when you
          contact us.
        </p>
        <p>
          <strong>Personal Information Provided by You:</strong> The personal
          information that we collect depends on the context of your
          interactions with us and the Services, the choices you make, and the
          products and features you use. The personal information we collect may
          include the following:
        </p>
        <ul className="list-disc px-20 space-y-2">
          <li>Phone numbers</li>
          <li>Email addresses</li>
          <li>Name</li>
          <li>Billing addresses</li>
        </ul>
        <p>
          <strong>Sensitive Information:</strong> We do not process sensitive
          information.
        </p>
        <p>
          <strong>Payment Data:</strong> We may collect data necessary to
          process your payment if you make purchases, such as your payment
          instrument number, and the security code associated with your payment
          instrument. All payment data is stored by PhonePe. You may find their
          privacy notice link(s){" "}
          <a href="https://www.phonepe.com/privacy-policy/">here</a>.
        </p>
        <p>
          <strong>Social Media Login Data:</strong> We may provide you with the
          option to register with us using your existing Google account. If you
          choose to register in this way, we will collect the information
          described in the section called &apos;HOW DO WE HANDLE YOUR SOCIAL
          LOGINS?&apos; Below.
        </p>
        <p>
          All personal information that you provide to us must be true,
          complete, and accurate, and you must notify us of any changes to such
          personal information.
        </p>
        <h3 className="font-bold text-md">
          Information automatically collected
        </h3>
        <p>
          In Short: Some information - such as your Internet Protocol (IP)
          address and/or browser and device characteristics — is collected
          automatically when you visit our Services.
        </p>
        <p>
          We automatically collect certain information when you visit, use, or
          navigate the Services. This information does not reveal your specific
          identity (like your name or contact information) but may include
          device and usage information, such as your IP address, browser and
          device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how
          and when you use our Services, and other technical information. This
          information is primarily needed to maintain the security and operation
          of our Services, and for our internal analytics and reporting
          purposes.
        </p>
        <p>
          Like many businesses, we also collect information through cookies and
          similar technologies.
        </p>
        <h2 className="text-md font-bold">
          2. HOW DO WE PROCESS YOUR INFORMATION?
        </h2>
        <p>
          In Short: We process your information to provide, improve, and
          administer our Services, communicate with you, for security and fraud
          prevention, and to comply with law. We may also process your
          information for other purposes with your consent.
        </p>
        <p>
          We process your personal information for a variety of reasons,
          depending on how you interact with our Services, including:
        </p>
        <ul className="list-disc px-20 space-y-2">
          <li>
            <b>
              To facilitate account creation and authentication and otherwise
              manage user accounts.
            </b>{" "}
            We may process your information so you can create and log in to your
            account, as well as keep your account in working order.
          </li>
          <li>
            <b> To deliver and facilitate delivery of services to the user.</b>{" "}
            We may process your information to provide you with the requested
            service.
          </li>
          <li>
            <b>To respond to user inquiries/offer support to users.</b> We may
            process your information to respond to your inquiries and solve any
            potential issues you might have with the requested service.
          </li>
          <li>
            <b> To send administrative information to you.</b> We may process
            your information to send you details about our products and
            services, changes to our terms and policies, and other similar
            information.
          </li>
          <b>To fulfil and manage your orders.</b> We may process your
          information to fulfil and manage your orders, payments, returns, and
          exchanges made through the Services.
          <li>
            <b>To send you marketing and promotional communications. </b>We may
            process the personal information you send to us for our marketing
            purposes, if this is in accordance with your marketing preferences.
            You can opt out of our marketing emails at any time. For more
            information, see &apos;WHAT ARE YOUR PRIVACY RIGHTS?&apos; below.
          </li>
          <li>
            <b>To deliver targeted advertising to you.</b> We may process your
            information to develop and display personalized content and
            advertising tailored to your interests, location, and more. For more
            information see our Cookie Notice:
          </li>
          <li>
            <b> To protect our Services.</b> We may process your information as
            part of our efforts to keep our Services safe and secure, including
            fraud monitoring and prevention.
          </li>
          <li>
            <b>
              To evaluate and improve our Services, products, marketing, and
              your experience.
            </b>{" "}
            We may process your information when we believe it is necessary to
            identify usage trends, determine the effectiveness of our
            promotional campaigns, and to evaluate and improve our Services,
            products, marketing, and your experience.{" "}
          </li>
          <li>
            <b> To identify usage trends. </b>We may process information about
            how you use our Services to better understand how they are being
            used so we can improve them.
          </li>
          <li>
            <b>
              To determine the effectiveness of our marketing and promotional
              campaigns.
            </b>{" "}
            We may process your information to better understand how to provide
            marketing and promotional campaigns that are most relevant to you.
          </li>
          <li>
            <b> To comply with our legal obligations.</b> We may process your
            information to comply with our legal obligations, respond to legal
            requests, and exercise, establish, or defend our legal rights.
          </li>
        </ul>
        <h2 className="text-md font-bold">
          3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </h2>
        <p>
          <strong>In Short:</strong> We may share information in specific
          situations described in this section and/or with the following third
          parties.
        </p>
        <p>
          <strong>
            Vendors, Consultants, and Other Third-Party Service Providers:
          </strong>{" "}
          We may share your data with third-party vendors, service providers,
          contractors, or agents (third parties who perform services for us or
          on our behalf and require access to such information to do that work).
          The third parties we may share personal information with are as
          follows:
        </p>
        <ul className="list-disc space-y-2 px-20">
          <li>
            <strong>Communicate and Chat with Users:</strong> Crisp
          </li>
          <li>
            <strong>Invoice and Billing:</strong> PhonePe
          </li>
          <li>
            <strong>User Account Registration and Authentication:</strong>{" "}
            Google Auth 2.0 and Google Sign-In
          </li>
          <li>
            <strong>Web and Mobile Analytics:</strong> Google Analytics
          </li>
        </ul>
        <p>
          We also may need to share your personal information in the following
          situations:
        </p>
        <ul className="list-disc px-20 space-y-2">
          <li>
            <strong>Business Transfers:</strong> We may share or transfer your
            information in connection with, or during negotiations of, any
            merger, sale of company assets, financing, or acquisition of all or
            a portion of our business to another company.
          </li>
          <li>
            <strong>When we use Google Analytics:</strong> We may share your
            information with Google Analytics to track and analyze the use of
            the Services. The Google Analytics Advertising Features that we may
            use include Google Analytics Demographics and Interests Reporting.
            To opt out of being tracked by Google Analytics across the Services,
            visit{" "}
            <Link
              href="https://tools.google.com/dlpage/gaoptout"
              className="text-[#A77737] underline">
              https://tools.google.com/dlpage/gaoptout
            </Link>
            . You can opt out of Google Analytics Advertising Features through
            Ads Settings and Ad Settings for mobile apps. Other opt-out means
            include{" "}
            <Link
              href="http://optout.networkadvertising.org/"
              className="text-[#A77737] underline">
              http://optout.networkadvertising.org/
            </Link>{" "}
            and{" "}
            <Link
              href="http://www.networkadvertising.org/mobile-choice"
              className="text-[#A77737] underline">
              http://www.networkadvertising.org/mobile-choice
            </Link>
            . For more information on the privacy practices of Google, please
            visit the Google Privacy & Terms page.
          </li>
        </ul>
        <h2 className="text-md font-bold">
          4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </h2>
        <p>
          In Short: We may use cookies and other tracking technologies to
          collect and store your information.
        </p>
        <p>
          We may use cookies and similar tracking technologies (like web beacons
          and pixels) to access or store information.{" "}
        </p>
        <h2 className="text-md font-bold">
          5. HOW DO WE HANDLE YOUR SOCIAL LOGINS WITH GOOGLE SIGN-IN AND GOOGLE
          OAUTH 2.0?
        </h2>
        <div>
          In Short: If you choose to register or log in to our Services using a
          google account, we may have access to certain information about you.
          <p>
            Our Services offer you the ability to register and log in using your
            google account details. Where you choose to do this, we will receive
            certain profile information about you from your google account. The
            profile information we receive will often include your name, email
            address and profile picture, and other information you choose to
            make public.
          </p>{" "}
          <p>
            We will use the information we receive only for the purposes
            described in this privacy notice or otherwise made clear to you on
            the relevant Services. Please note that we do not control, and are
            not responsible for, other uses of your personal information by your
            third-party social media provider. We recommend that you review
            their privacy notices to understand how they collect, use, and share
            your personal information, and how you can set your privacy
            preferences on their sites and apps.{" "}
          </p>
        </div>
        <h2 className="text-md font-bold">
          6. HOW LONG DO WE KEEP YOUR INFORMATION?
        </h2>
        <p>
          In Short: We keep your information for as long as necessary to fulfil
          the purposes outlined in this privacy notice unless otherwise required
          by law.{" "}
        </p>
        <p>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us to keep your personal information for longer than the
          period of time in which users have an account with us.{" "}
        </p>
        <p>
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </p>
        <h2 className="text-md font-bold">
          7. HOW DO WE KEEP YOUR INFORMATION SAFE?
        </h2>
        <p>
          In Short: We aim to protect your personal information through a system
          of organizational and technical security measures.{" "}
        </p>
        <p>
          We have implemented appropriate and reasonable technical and
          organizational security measures designed to protect the security of
          any personal information we process. However, despite our safeguards
          and efforts to secure your information, no electronic transmission
          over the Internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Although we will do our best to protect your
          personal information, transmission of personal information to and from
          our Services is at your own risk. You should only access the Services
          within a secure environment.{" "}
        </p>
        <h2 className="text-md font-bold">
          8. DO WE COLLECT INFORMATION FROM MINORS?
        </h2>
        <p>
          In Short: We do not knowingly collect data from or market to children
          under 18 years of age.{" "}
        </p>
        <p>
          We do not knowingly solicit data from or market to children under 18
          years of age. By using the Services, you represent that you are at
          least 18 or that you are the parent or guardian of such a minor and
          consent to such minor dependent&apos;s use of the Services. If we
          learn that personal information from users less than 18 years of age
          has been collected, we will deactivate the account and take reasonable
          measures to promptly delete such data from our records. If you become
          aware of any data we may have collected from children under age 18,
          please contact us at kurtiveda@gmail.com.{" "}
        </p>
        <h2 className="text-md font-bold">9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
        In Short: You may review, change, or terminate your account at any time.
        <p>
          Withdrawing your consent: If we are relying on your consent to process
          your personal information, which may be express and/or implied consent
          depending on the applicable law, you have the right to withdraw your
          consent at any time.{" "}
        </p>
        <p>
          You can withdraw your consent at any time by contacting us by using
          the contact details provided in the section &apos;HOW CAN YOU CONTACT
          US ABOUT THIS NOTICE?&apos; below.{" "}
        </p>
        <p>
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal nor, when applicable law allows, will
          it affect the processing of your personal information conducted in
          reliance on lawful processing grounds other than consent.{" "}
        </p>
        <p>
          <strong>Account Information</strong>
        </p>
        <p>
          If you would at any time like to review or change the information in
          your account or terminate your account, you can contact us using the
          contact information provided.
        </p>
        <p>
          Upon your request to terminate your account, we will deactivate or
          delete your account and information from our active databases.
          However, we may retain some information in our files to prevent fraud,
          troubleshoot problems, assist with any investigations, enforce our
          legal terms and/or comply with applicable legal requirements.
        </p>
        <p>
          <strong>Cookies and Similar Technologies</strong>
        </p>
        <p>
          Most web browsers are set to accept cookies by default. If you prefer,
          you can usually choose to set your browser to remove cookies and to
          reject cookies. If you choose to remove cookies or reject cookies,
          this could affect certain features or services of our Services. For
          further information, please see our Cookie Notice:
        </p>
        <p>
          If you have questions or comments about your privacy rights, you may
          email us at{" "}
          <a
            href="mailto:kurtiveda@gmail.com"
            className="text-blue-600 underline">
            kurtiveda@gmail.com
          </a>
          .
        </p>
        <h2 className="text-md font-bold">
          10. CONTROLS FOR DO-NOT-TRACK FEATURES
        </h2>
        <p>
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track (&apos;DNT&apos;) feature or
          setting you can activate to signal your privacy preference not to have
          data about your online browsing activities monitored and collected. At
          this stage no uniform technology standard for recognizing and
          implementing DNT signals has been finalized. As such, we do not
          currently respond to DNT browser signals or any other mechanism that
          automatically communicates your choice not to be tracked online. If a
          standard for online tracking is adopted that we must follow in the
          future, we will inform you about that practice in a revised version of
          this privacy notice.{" "}
        </p>
        <h2 className="text-md font-bold">
          11. DO WE MAKE UPDATES TO THIS NOTICE?
        </h2>
        <p>
          In Short: Yes, we will update this notice as necessary to stay
          compliant with relevant laws. We may update this privacy notice from
          time to time. The updated version will be indicated by an updated
          &apos;Revised&apos; date and the updated version will be effective as
          soon as it is accessible. If we make material changes to this privacy
          notice, we may notify you either by prominently posting a notice of
          such changes or by directly sending you a notification. We encourage
          you to review this privacy notice frequently to be informed of how we
          are protecting your information.{" "}
        </p>
        <h2 className="text-md font-bold">
          12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
        </h2>
        <p>
          If you have questions or comments about this notice, you may email us
          at{" "}
          <a
            href="mailto:kurtiveda@gmail.com"
            className="text-blue-600 underline">
            kurtiveda@gmail.com
          </a>{" "}
          or contact us by post at:
        </p>
        <p>
          Tara Enterprises <br />
          290, Sindhi Colony, Bani Park <br />
          Jaipur, Rajasthan 302016 <br />
          India
        </p>
        <h2 className="text-md font-bold">
          13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
          YOU?
        </h2>
        <p>
          Based on the applicable law of your country, you may have the right to
          request access to the personal information we collect from you, change
          that information, or delete it. To request to review, update, or
          delete your personal information, please contact us at:{" "}
          <a
            href="mailto:kurtiveda@gmail.com"
            className="text-blue-600 underline">
            kurtiveda@gmail.com
          </a>
          .
        </p>
        h
      </div>
    </div>
  );
}

export default page;
