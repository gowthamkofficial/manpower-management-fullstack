import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartmentDialog } from './create-department-dialog';

describe('CreateDepartmentDialog', () => {
  let component: CreateDepartmentDialog;
  let fixture: ComponentFixture<CreateDepartmentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDepartmentDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDepartmentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
