import svgPaths from "./svg-ioe3wymbp5";
import clsx from "clsx";
const imgKcLogoWhite2Transparent2 = "/src/assets/4b4bad59041302b06eae37218f1d3bd7c64d7d1e.png";
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={additionalClassNames}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return <Wrapper2 additionalClassNames={clsx("absolute", additionalClassNames)}>{children}</Wrapper2>;
}
type DashboardForSuperAdminHelper1Props = {
  additionalClassNames?: string;
};

function DashboardForSuperAdminHelper1({ children, additionalClassNames = "" }: React.PropsWithChildren<DashboardForSuperAdminHelper1Props>) {
  return (
    <div className={clsx("h-0 relative", additionalClassNames)}>
      <div className="absolute inset-[-0.25px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 1">
          {children}
        </svg>
      </div>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-4.17%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
          {children}
        </svg>
      </div>
    </div>
  );
}
type DashboardForSuperAdminHelperProps = {
  additionalClassNames?: string;
};

function DashboardForSuperAdminHelper({ additionalClassNames = "" }: DashboardForSuperAdminHelperProps) {
  return (
    <div className={clsx("absolute size-[30px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <circle cx="15" cy="15" fill="var(--fill-0, #D9D9D9)" id="Ellipse 27" r="15" />
      </svg>
    </div>
  );
}
type OrderApproveProps = {
  additionalClassNames?: string;
};

function OrderApprove({ additionalClassNames = "" }: OrderApproveProps) {
  return (
    <Wrapper2 additionalClassNames={clsx("absolute size-[24px]", additionalClassNames)}>
      <g id="order_approve">
        <mask height="24" id="mask0_35_246" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
          <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
        </mask>
        <g mask="url(#mask0_35_246)">
          <path d={svgPaths.p20e0b780} fill="var(--fill-0, #1EC038)" id="order_approve_2" />
        </g>
      </g>
    </Wrapper2>
  );
}

function Group2() {
  return (
    <Wrapper1 additionalClassNames="inset-[31.11%_20.56%_66.98%_77.78%]">
      <g id="Group 15">
        <path d={svgPaths.p3efc9d00} fill="var(--fill-0, #BA68C8)" id="Vector" />
        <path d={svgPaths.p3f537d00} fill="var(--fill-0, #BA68C8)" id="Vector_2" />
      </g>
    </Wrapper1>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[41px] rounded-[12px] top-[25px] w-[122px]" data-name="Text">
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[69px] not-italic text-[24px] text-center text-white top-0 translate-x-[-50%] translate-y-[-50%] w-[170px]">
        <p className="leading-[28px]">Download GR</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#8363f2] content-stretch flex items-center left-[calc(75%+40px)] min-h-[56px] px-[24px] py-[12px] rounded-[8px] top-[1090px]" data-name="Button">
      <Text />
    </div>
  );
}

function Group() {
  return (
    <Wrapper additionalClassNames="inset-[25.3%_95.9%_72.79%_2.43%]">
      <g id="Group">
        <path d={svgPaths.p1d4ae3f0} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d={svgPaths.pbfd1c00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </Wrapper>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[25.3%_95.9%_72.79%_2.43%]" data-name="Group">
      <Group />
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[25.3%_95.9%_72.79%_2.43%]" data-name="Mask group">
      <Group1 />
      <div className="absolute inset-[24.98%_95.63%_72.47%_2.15%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <path d="M0 0H32V32H0V0Z" fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="absolute contents left-0 top-[121px]" data-name="Menu">
      <div className="absolute bg-[#8363f2] h-[49px] left-0 top-[121px] w-[222px]" />
      <Wrapper1 additionalClassNames="left-[35px] size-[24px] top-[135px]">
        <path d={svgPaths.p23320a80} fill="var(--fill-0, white)" id="Vector" />
      </Wrapper1>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[124px] not-italic text-[20px] text-center text-white top-[147px] translate-x-[-50%] translate-y-[-50%] w-[104px]">
        <p className="leading-[28px]">Dashboard</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[72px] not-italic text-[#202020] text-[20px] top-[271px] translate-y-[-50%] w-[122px]">
        <p className="leading-[28px]">Vouchers</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[70px] not-italic text-[#202020] text-[20px] top-[207px] translate-y-[-50%] w-[122px]">
        <p className="leading-[28px]">Campaigns</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[72px] not-italic text-[#202020] text-[20px] top-[330px] translate-y-[-50%] w-[122px]">
        <p className="leading-[28px]">Transactions</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[70px] not-italic text-[#202020] text-[20px] top-[386px] translate-y-[-50%] w-[122px]">
        <p className="leading-[28px]">Profile</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[72px] not-italic text-[#202020] text-[20px] top-[441px] translate-y-[-50%] w-[122px]">
        <p className="leading-[28px]">Overview</p>
      </div>
      <div className="absolute inset-[38.5%_95.97%_59.27%_2.36%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 28">
          <path d={svgPaths.p2187b600} fill="var(--fill-0, black)" id="Vector" opacity="0.8" />
        </svg>
      </div>
      <MaskGroup />
      <Wrapper1 additionalClassNames="inset-[15.67%_95.9%_82.42%_2.43%]">
        <path d={svgPaths.p662940} fill="var(--fill-0, black)" id="Vector" />
      </Wrapper1>
      <div className="absolute inset-[34.29%_95.9%_64.12%_2.43%]" data-name="Vector">
        <div className="absolute inset-[-5%_-4.17%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 22">
            <path d={svgPaths.p3ebaad70} id="Vector" stroke="var(--stroke-0, black)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <Wrapper1 additionalClassNames="inset-[20.76%_95.9%_77.33%_2.43%]">
        <path d={svgPaths.p666ca00} fill="var(--fill-0, black)" id="Vector" />
      </Wrapper1>
      <Wrapper1 additionalClassNames="inset-[29.83%_95.9%_68.26%_2.43%]">
        <path clipRule="evenodd" d={svgPaths.p3e294900} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
      </Wrapper1>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[32px] top-[602px]">
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[94px] not-italic text-[#202020] text-[20px] text-center text-nowrap top-[656px] translate-x-[-50%] translate-y-[-50%]">
        <p className="leading-[28px]">Help</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[72px] not-italic text-[#202020] text-[20px] top-[719px] translate-y-[-50%] w-[122px]">
        <p className="leading-[28px]">Logout</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[32px] not-italic text-[#8363f2] text-[13px] top-[616px] translate-y-[-50%] w-[104px]">
        <p className="leading-[28px]">Feedback</p>
      </div>
      <Wrapper1 additionalClassNames="inset-[56.25%_95.9%_41.85%_2.43%]">
        <path d={svgPaths.p3591e200} fill="var(--fill-0, #F63232)" id="Vector" />
      </Wrapper1>
    </div>
  );
}

function Search() {
  return (
    <Wrapper1 additionalClassNames="left-[8px] size-[24px] top-[8px]">
      <g id="search 1">
        <path clipRule="evenodd" d={svgPaths.p250aca00} fill="var(--fill-0, #7878AB)" fillRule="evenodd" id="Union" />
      </g>
    </Wrapper1>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#f5f5fa] overflow-clip right-[12px] rounded-[32px] shadow-[5px_5px_10px_0px_rgba(170,170,204,0.5),-5px_-5px_10px_0px_white] size-[40px] top-1/2 translate-y-[-50%]" data-name="Button">
      <Search />
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-[#f5f5fa] h-[64px] left-[calc(16.67%+37px)] overflow-clip rounded-[20px] top-[21px] w-[360px]" data-name="Input">
      <div className="absolute flex flex-col font-['SF_Pro_Rounded:Light',sans-serif] justify-center leading-[0] left-[32px] not-italic opacity-60 right-[64px] text-[#7878ab] text-[24px] top-1/2 translate-y-[-50%]">
        <p className="leading-[40px]">{`Search `}</p>
      </div>
      <Button1 />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_-2px_-2px_4px_0px_rgba(255,255,255,0.5),inset_2px_2px_4px_0px_rgba(170,170,204,0.25),inset_5px_5px_10px_0px_rgba(170,170,204,0.5),inset_-5px_-5px_10px_0px_white]" />
    </div>
  );
}

function ProfileAvatar() {
  return (
    <Wrapper1 additionalClassNames="left-[calc(91.67%+56px)] size-[24px] top-[43px]">
      <g clipPath="url(#clip0_35_196)" id="Profile Avatar">
        <path d={svgPaths.p10fc6980} fill="var(--fill-0, black)" id="Vector" />
        <path d={svgPaths.p1534e400} fill="var(--fill-0, #EEEEEE)" fillOpacity="0.933333" id="Vector_2" />
        <path d={svgPaths.p38192080} fill="var(--fill-0, #EEEEEE)" fillOpacity="0.933333" id="Vector_3" />
      </g>
      <defs>
        <clipPath id="clip0_35_196">
          <rect fill="white" height="24" width="24" />
        </clipPath>
      </defs>
    </Wrapper1>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[41px] rounded-[12px] top-[12px]" data-name="Text">
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[46px] not-italic text-[20px] text-center text-white top-[17px] translate-x-[-50%] translate-y-[-50%] w-[104px]">
        <p className="leading-[28px]">Create</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#8363f2] content-stretch flex items-center left-[calc(75%-1px)] min-h-[56px] px-[24px] py-[12px] rounded-[8px] top-[22px] w-[150px]" data-name="Button">
      <Text1 />
    </div>
  );
}

function AppRegistration() {
  return (
    <Wrapper1 additionalClassNames="left-[calc(75%+18.78px)] size-[24px] top-[38.67px]">
      <g id="app_registration">
        <mask height="24" id="mask0_35_186" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
          <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
        </mask>
        <g mask="url(#mask0_35_186)">
          <path d={svgPaths.pb95a080} fill="var(--fill-0, white)" id="app_registration_2" />
        </g>
      </g>
    </Wrapper1>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[calc(75%+18.78px)] top-[38.67px]">
      <AppRegistration />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[calc(75%+18.78px)] top-[38.67px]">
      <Group3 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-[calc(75%-1px)] top-[22px]">
      <Button2 />
      <Group4 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[calc(75%-1px)] top-[22px]">
      <Group6 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute contents left-[calc(16.67%+37px)] top-[21px]" data-name="Header">
      <Input />
      <ProfileAvatar />
      <Wrapper1 additionalClassNames="inset-[3.42%_6.94%_94.67%_91.39%]">
        <path d={svgPaths.p3422b400} fill="var(--fill-0, #202020)" id="Vector" />
      </Wrapper1>
      <Wrapper additionalClassNames="inset-[3.42%_10.76%_94.67%_87.57%]">
        <path d={svgPaths.p12cfc680} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </Wrapper>
      <Group7 />
    </div>
  );
}

export default function DashboardForSuperAdmin() {
  return (
    <div className="bg-white relative size-full" data-name="Dashboard for Super Admin">
      <div className="absolute bg-[rgba(131,99,242,0.2)] h-[183px] left-[calc(16.67%+27px)] rounded-[15px] shadow-[0px_1px_3px_1px_rgba(0,0,0,0.25)] top-[256px] w-[260px]" />
      <div className="absolute bg-white h-[745px] left-[calc(66.67%+104px)] rounded-[15px] shadow-[0px_1px_3px_1px_rgba(0,0,0,0.25)] top-[473px] w-[297px]" />
      <div className="absolute bg-[rgba(186,104,200,0.2)] h-[183px] left-[calc(50%+107px)] rounded-[15px] shadow-[0px_1px_3px_1px_rgba(0,0,0,0.25)] top-[257px] w-[260px]" />
      <div className="absolute bg-[rgba(45,27,105,0.2)] h-[183px] left-[calc(33.33%+65px)] rounded-[15px] shadow-[0px_1px_3px_1px_rgba(0,0,0,0.25)] top-[257px] w-[260px]" />
      <div className="absolute bg-white h-[183px] left-[calc(75%+23px)] rounded-[15px] shadow-[0px_1px_3px_1px_rgba(0,0,0,0.25)] top-[257px] w-[260px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[82px] left-[calc(16.67%+68px)] not-italic text-[24px] text-black text-nowrap top-[250px] tracking-[-0.32px]">User Overview</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[82px] left-[calc(33.33%+83px)] not-italic text-[#1a1919] text-[24px] text-nowrap top-[252px] tracking-[-0.32px]">Campaigns Overview</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[82px] left-[58.33%] not-italic text-[#1a1919] text-[24px] text-nowrap top-[250px] tracking-[-0.32px]">Vendors Overview</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[82px] left-[calc(75%+40px)] not-italic text-[#1a1919] text-[24px] text-nowrap top-[250px] tracking-[-0.32px]">Corporate Overview</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[82px] left-[calc(16.67%+71px)] not-italic text-[40px] text-black text-nowrap top-[309px] tracking-[-0.32px]">1,200</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[82px] left-[calc(33.33%+84px)] not-italic text-[#2d1b69] text-[40px] text-nowrap top-[309px] tracking-[-0.32px]">65</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[82px] left-[calc(75%+17px)] not-italic text-[#2d1b69] text-[40px] text-nowrap top-[519px] tracking-[-0.32px]">251</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[82px] left-[58.33%] not-italic text-[#14ae5c] text-[40px] text-nowrap top-[309px] tracking-[-0.32px]">80</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[82px] left-[calc(75%+40px)] not-italic text-[#ba68c8] text-[40px] text-nowrap top-[309px] tracking-[-0.32px]">100</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-[calc(16.67%+71px)] not-italic text-[#363535] text-[24px] text-nowrap top-[385px] tracking-[-0.32px]">Total Users</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-[calc(41.67%-4px)] not-italic text-[#525050] text-[24px] text-nowrap top-[385px] tracking-[-0.32px]">Active</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-[calc(58.33%+26px)] not-italic text-[#525050] text-[24px] text-nowrap top-[385px] tracking-[-0.32px]">{`Active  Vendors`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-[calc(75%+17px)] not-italic text-[#525050] text-[20px] text-nowrap top-[592px] tracking-[-0.32px]">New users this week</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-[calc(75%+67px)] not-italic text-[#525050] text-[24px] text-nowrap top-[391px] tracking-[-0.32px]">{`Active  available`}</p>
      <div className="absolute flex h-[433.721px] items-center justify-center left-[calc(16.67%+28.84px)] top-[474.05px] w-[782.147px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270.359deg] skew-x-[0.139deg]">
          <div className="bg-white h-[779.455px] rounded-[8px] shadow-[0px_4px_6px_1px_rgba(95,94,96,0.25)] w-[430.735px]" data-name="Rounded rectangle" />
        </div>
      </div>
      <div className="absolute h-0 left-[calc(16.67%+101px)] top-[812.97px] w-[330px]">
        <div className="absolute inset-[-0.25px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 330 1">
            <path d="M0 0.25H330" id="Vector 35" stroke="var(--stroke-0, #868484)" strokeOpacity="0.5" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[2.038px] items-center justify-center left-[calc(16.67%+99.73px)] top-[759.25px] w-[330.582px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.353deg] skew-x-[0.103deg]">
          <div className="h-0 relative w-[330.588px]">
            <div className="absolute inset-[-0.25px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 331 1">
                <path d="M0 0.25H330.588" id="Vector 36" stroke="var(--stroke-0, #868484)" strokeOpacity="0.5" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[1.996px] items-center justify-center left-[calc(25%-13.34px)] top-[713.3px] w-[323.853px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.353deg] skew-x-[0.103deg]">
          <DashboardForSuperAdminHelper1 additionalClassNames="w-[323.859px]">
            <path d="M0 0.25H323.859" id="Vector 37" stroke="var(--stroke-0, #868484)" strokeOpacity="0.5" strokeWidth="0.5" />
          </DashboardForSuperAdminHelper1>
        </div>
      </div>
      <div className="absolute flex h-[1.991px] items-center justify-center left-[calc(25%-13.11px)] top-[661.3px] w-[323.011px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.353deg] skew-x-[0.103deg]">
          <DashboardForSuperAdminHelper1 additionalClassNames="w-[323.018px]">
            <path d="M0 0.25H323.018" id="Vector 38" stroke="var(--stroke-0, #868484)" strokeOpacity="0.5" strokeWidth="0.5" />
          </DashboardForSuperAdminHelper1>
        </div>
      </div>
      <div className="absolute flex h-[2.994px] items-center justify-center left-[calc(25%-12.5px)] top-[600.3px] w-[323.494px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.53deg] skew-x-[0.171deg]">
          <DashboardForSuperAdminHelper1 additionalClassNames="w-[323.508px]">
            <path d="M0 0.25H323.508" id="Vector 39" stroke="var(--stroke-0, #868484)" strokeOpacity="0.5" strokeWidth="0.5" />
          </DashboardForSuperAdminHelper1>
        </div>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[82px] leading-[82px] left-[calc(16.67%+57.14px)] not-italic text-[#918f8f] text-[16px] top-[772.89px] tracking-[-0.32px] w-[14px]">0</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[82px] left-[calc(16.67%+54.14px)] not-italic text-[#918f8f] text-[16px] top-[717.89px] tracking-[-0.32px] w-[51px]">10</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[82px] leading-[82px] left-[calc(16.67%+54.14px)] not-italic text-[#918f8f] text-[16px] top-[672.89px] tracking-[-0.32px] w-[51px]">20</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[82px] leading-[82px] left-[calc(16.67%+54.14px)] not-italic text-[#918f8f] text-[16px] top-[619.89px] tracking-[-0.32px] w-[52px]">30</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[82px] leading-[82px] left-[calc(16.67%+53.14px)] not-italic text-[#918f8f] text-[16px] top-[555.89px] tracking-[-0.32px] w-[68px]">40</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[82px] leading-[82px] left-[calc(25%-9px)] not-italic text-[#636060] text-[16px] top-[799px] tracking-[-0.32px] w-[36px]">Jan</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[82px] leading-[82px] left-[calc(25%+60px)] not-italic text-[#636060] text-[16px] top-[799px] tracking-[-0.32px] w-[36px]">Feb</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[82px] leading-[82px] left-[calc(33.33%-6px)] not-italic text-[#636060] text-[16px] top-[799px] tracking-[-0.32px] w-[37px]">Mar</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[82px] leading-[82px] left-[calc(33.33%+58px)] not-italic text-[#636060] text-[16px] top-[799px] tracking-[-0.32px] w-[34px]">Apr</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[82px] leading-[82px] left-[calc(41.67%-7px)] not-italic text-[#636060] text-[16px] top-[799px] tracking-[-0.32px] w-[42px]">May</p>
      <Wrapper1 additionalClassNames="inset-[30.63%_59.44%_67.46%_38.89%]">
        <path d={svgPaths.p662940} fill="var(--fill-0, #2D1B69)" id="Vector" />
      </Wrapper1>
      <Wrapper1 additionalClassNames="inset-[31.11%_40%_66.98%_58.33%]">
        <path d={svgPaths.p8c5600} fill="var(--fill-0, #14AE5C)" id="Vector" />
      </Wrapper1>
      <Group2 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[82px] left-[calc(16.67%+73px)] not-italic text-[#1a1919] text-[24px] text-nowrap top-[488px] tracking-[-0.32px]">Campaign activity</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[82px] left-[calc(16.67%+48px)] not-italic text-[#1a1919] text-[24px] text-nowrap top-[908px] tracking-[-0.32px]">Recent activity</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[82px] left-[calc(75%+34px)] not-italic text-[#5d5b5b] text-[24px] text-nowrap top-[466px] tracking-[-0.32px]">Active this week</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[82px] left-[calc(50%+106px)] not-italic text-[40px] text-black text-nowrap top-[654px] tracking-[-0.32px]">32%</p>
      <div className="absolute flex items-center justify-center left-[calc(50%+31px)] size-[223px] top-[585px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[58.328deg]">
          <div className="relative size-[162.049px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 163 163">
              <path d={svgPaths.p2a165f80} fill="var(--fill-0, #D9D9D9)" id="Ellipse 25" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[calc(50%+55.84px)] size-[181.503px] top-[606.6px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[172.628deg]">
          <div className="relative size-[162.049px]">
            <div className="absolute inset-[0_40.39%_0.93%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 97 161">
                <path d={svgPaths.p1326eec0} fill="var(--fill-0, #BA68C8)" id="Ellipse 26" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[30px] left-[calc(50%+63px)] text-[20px] text-black text-nowrap top-[567px] tracking-[-0.32px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Active Campaigns
      </p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-[calc(58.33%+93px)] not-italic text-[#8363f2] text-[24px] text-nowrap top-[790px] tracking-[-0.32px]">{`+7.2% `}</p>
      <div className="absolute inset-[56.64%_9.1%_29.28%_78.4%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 177">
          <path d={svgPaths.p3b34c580} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[82px] left-[calc(16.67%+27px)] not-italic text-[32px] text-black text-nowrap top-[115px] tracking-[-0.32px]">Admin overview</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[82px] left-[calc(16.67%+27px)] not-italic text-[20px] text-black text-nowrap top-[158px] tracking-[-0.32px]">Here’s an overview of Platform activity</p>
      <Button />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[82px] left-[calc(16.67%+99px)] not-italic text-[20px] text-black text-nowrap top-[970px] tracking-[-0.32px]">{`CIPC document will expire in 5 days `}</p>
      <DashboardForSuperAdminHelper additionalClassNames="left-[calc(16.67%+43px)] top-[982px]" />
      <DashboardForSuperAdminHelper additionalClassNames="left-[calc(16.67%+41px)] top-[1057px]" />
      <OrderApprove additionalClassNames="left-[calc(16.67%+46px)] top-[985px]" />
      <OrderApprove additionalClassNames="left-[calc(16.67%+44px)] top-[1058px]" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[82px] left-[calc(16.67%+103px)] not-italic text-[20px] text-black text-nowrap top-[1044px] tracking-[-0.32px]">{`Monthly platform report is new available to view `}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[82px] left-[calc(16.67%+103px)] not-italic text-[20px] text-black text-nowrap top-[1106px] tracking-[-0.32px]">New campaign has been created by user 001cfoP</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[82px] left-[calc(16.67%+103px)] not-italic text-[20px] text-black text-nowrap top-[1172px] tracking-[-0.32px]">New campaign has been created by user 001cfoP</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[82px] left-[calc(58.33%+95px)] not-italic text-[#595858] text-[24px] text-nowrap top-[970px] tracking-[-0.32px]">1 hour ago</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[82px] left-[calc(58.33%+93px)] not-italic text-[#595858] text-[24px] text-nowrap top-[1042px] tracking-[-0.32px]">4 hour ago</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[82px] left-[calc(58.33%+91px)] not-italic text-[#595858] text-[24px] text-nowrap top-[1104px] tracking-[-0.32px]">4 days ago</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[82px] left-[calc(58.33%+93px)] not-italic text-[#595858] text-[24px] text-nowrap top-[1171px] tracking-[-0.32px]">4 days ago</p>
      <div className="absolute bg-[#ba68c8] h-[116px] left-[calc(16.67%+105px)] top-[700px] w-[52px]" />
      <div className="absolute bg-[#8363f2] h-[158px] left-[calc(25%+46px)] top-[658px] w-[52px]" />
      <div className="absolute bg-[#2d1b69] h-[158px] left-[calc(25%+103px)] top-[658px] w-[52px]" />
      <div className="absolute bg-[#8363f2] h-[179px] left-[calc(33.33%+42px)] top-[637px] w-[52px]" />
      <div className="absolute bg-[#ba68c8] h-[85px] left-[calc(33.33%+103px)] top-[731px] w-[52px]" />
      <Wrapper1 additionalClassNames="inset-[90.29%_78.4%_7.8%_19.93%]">
        <path clipRule="evenodd" d={svgPaths.p3e294900} fill="var(--fill-0, #2D1B69)" fillRule="evenodd" id="Vector" />
      </Wrapper1>
      <Wrapper1 additionalClassNames="inset-[95.7%_78.54%_2.39%_19.79%]">
        <path clipRule="evenodd" d={svgPaths.p3e294900} fill="var(--fill-0, #8363F2)" fillRule="evenodd" id="Vector" />
      </Wrapper1>
      <Menu />
      <div className="absolute h-[65px] left-[calc(4.17%-4.5px)] top-[9px] translate-x-[-50%] w-[59px]" data-name="KC-Logo-White-2-Transparent 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[152.98%] left-[-72.22%] max-w-none top-[-0.08%] w-[225.56%]" src={imgKcLogoWhite2Transparent2} />
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[calc(8.33%+63px)] top-[40px] w-[18px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-0 relative w-[18px]">
            <div className="absolute inset-[-11.05px_-8.33%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 23">
                <path d={svgPaths.p2c866000} fill="var(--stroke-0, #8363F2)" id="Arrow 1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Group5 />
      <div className="absolute flex h-[1662px] items-center justify-center left-[calc(8.33%+102px)] top-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[1662px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1662 1">
                <line id="Line 5" stroke="var(--stroke-0, #ACAAAA)" x2="1662" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[70px] not-italic text-[#202020] text-[20px] top-[499px] translate-y-[-50%] w-[122px]">
        <p className="leading-[28px]">Draft</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[68px] not-italic text-[#202020] text-[20px] top-[555px] translate-y-[-50%] w-[122px]">
        <p className="leading-[28px]">Verified</p>
      </div>
      <Header />
      <Wrapper1 additionalClassNames="inset-[43.36%_95.97%_54.73%_2.36%]">
        <path d={svgPaths.p3f3085c0} fill="var(--fill-0, black)" id="Vector" />
      </Wrapper1>
      <Wrapper1 additionalClassNames="inset-[51.39%_95.97%_46.7%_2.36%]">
        <path d={svgPaths.p3754a70} fill="var(--fill-0, black)" id="Vector" />
      </Wrapper1>
      <div className="absolute flex h-0 items-center justify-center left-[calc(8.33%+83px)] top-[93px] w-[1234px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-0 relative w-[1234px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1234 1">
                <line id="Line 1" stroke="var(--stroke-0, #ACAAAA)" x2="1234" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}