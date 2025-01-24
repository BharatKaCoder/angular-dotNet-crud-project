import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { CommonServiceService } from '../../Services/common-service.service';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], // Corrected property name
})
export class NavbarComponent {

  @ViewChild('navbarSupportedContent') navbarSupportedContent!: ElementRef;
  @ViewChild('horiSelector') horiSelector!: ElementRef;

  loggedUserName: string = "";
  isUserLoggedIn: boolean = false;
  navItems = [
    { id: 'teams', label: 'Teams', icon: 'bi bi-speedometer', link: '/teams', active: false, isShowMenu: true, disabled: true },
    { id:'addressBook', label: 'Address Book', icon: 'far fa-address-book', link: '/addressBook', active: false, isShowMenu: true, disabled: true },
    { id:'components', label: 'Components', icon: 'far fa-clone', link: '#', active: false, isShowMenu: true, disabled: true },
    { id:'calendar', label: 'Calendar', icon: 'far fa-calendar-alt', link: '#', active: false, isShowMenu: true, disabled: true },
    { id:'charts', label: 'Charts', icon: 'far fa-chart-bar', link: '#', active: false, isShowMenu: true, disabled: true },
    { id: 'logout', label: 'Logout', icon: 'bi bi-unlock-fill', link: '#', active: false, isShowMenu: false, disabled: false }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _router: Router,
    private _commonService: CommonServiceService,
    private route: ActivatedRoute,
    private renderer: Renderer2 // Added Renderer2 for DOM manipulation
  ) {}
  
  ngOnInit(): void {
    this.setActiveClassOnPageLoad();
    this._commonService.currentUserDetails.subscribe((data:any)=>{
      if(data) {
        this.loggedUserName = data.userName;
        this.isUserLoggedIn = data.isValidedUser;
        this.navItems[5].isShowMenu = data.isValidedUser;
        if(this.isUserLoggedIn) {
          this.navItems.forEach((i) => {
            if (i.id === 'teams' && 'addressBook') {
              i.disabled = false;
            }
          })
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.updateActiveTab();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateActiveTab();
  }

  toggleNavbar(): void {
    const navbar: HTMLElement = this.navbarSupportedContent.nativeElement;
    navbar.classList.toggle('show');
    this.updateActiveTab()
  }

  setActiveClassOnPageLoad(): void {
    const currentRoute = this._router.url; // Get the current URL
    this.navItems.forEach(item => {
      item.active = currentRoute.includes(item.link); // Adjust logic based on your routing structure
    });
  }

  updateActiveTab(): void {
    const tabsNewAnim: HTMLElement = this.navbarSupportedContent.nativeElement;
    const activeItemNewAnim: HTMLElement | null = tabsNewAnim.querySelector('.nav-item.active');

    if (activeItemNewAnim) {
      const horiSelector: HTMLElement = this.horiSelector.nativeElement;
    }
  }
  
  onTabClick(item: any, event: MouseEvent): void {
    // Remove active class from all tabs
    this.navItems.forEach(i => i.active = false);
    // Add active class to clicked tab
    item.active = true;
    if (item.id === 'logout') {
      this.isUserLoggedIn = false;
      item.isShowMenu = false;
      sessionStorage.clear();
      this._router.navigate(['']);
    }

    // Update the active tab position and size
    setTimeout(() => this.updateActiveTab(), 0);
  }
}
