import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], // Corrected property name
})
export class NavbarComponent {

  @ViewChild('navbarSupportedContent') navbarSupportedContent!: ElementRef;
  @ViewChild('horiSelector') horiSelector!: ElementRef;

  navItems = [
    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', link: '#', active: false },
    { label: 'Address Book', icon: 'far fa-address-book', link: '#', active: false },
    { label: 'Components', icon: 'far fa-clone', link: '#', active: false },
    { label: 'Calendar', icon: 'far fa-calendar-alt', link: '#', active: false },
    { label: 'Charts', icon: 'far fa-chart-bar', link: '#', active: false },
    { label: 'Documents', icon: 'far fa-copy', link: '#', active: false }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2 // Added Renderer2 for DOM manipulation
  ) {}
  
  ngOnInit(): void {
    this.setActiveClassOnPageLoad();
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
    const currentRoute = this.router.url; // Get the current URL
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

    // Update the active tab position and size
    setTimeout(() => this.updateActiveTab(), 0);
  }
}
