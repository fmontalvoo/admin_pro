import { Component, OnDestroy, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Usuario } from 'src/app/models/usuario.model';

import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ImageModalService } from 'src/app/services/image-modal.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public from: number = 0;
  public total: number = 0;
  public cargando: boolean = true;
  public usuarios: Usuario[] = [];

  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private as: AuthService,
    private us: UsuarioService,
    private bs: BusquedasService,
    private ims: ImageModalService,
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    const sub = this.ims.imgChange
      .pipe(delay(500))
      .subscribe(() => this.cargarUsuarios());

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private cargarUsuarios(): void {
    this.cargando = true;
    const sub = this.us.listarUsuarios(this.from)
      .subscribe({
        next: ({ usuarios, total }) => {
          this.total = total;
          this.cargando = false;
          this.usuarios = usuarios;
        },
        error: e => console.error(e),
        complete: () => console.info('Lista recuperada')
      });
    this.subscriptions.push(sub);
  }

  public buscar(query: string): void {
    this.cargando = true;
    if (query) {
      const sub = this.bs.buscar(query, 'usuarios')
        .subscribe({
          next: resultados => {
            this.cargando = false;
            console.log(resultados);
            this.usuarios = resultados;
          },
          error: e => console.error(e),
          complete: () => console.info('Busqueda completada')
        });
      this.subscriptions.push(sub);
    } else {
      this.cargarUsuarios();
    }
  }

  public cambiarRol(usuario: Usuario): void {
    const sub = this.us.editarUsuario(usuario)
      .subscribe({
        next: response => {
          console.log(response);
        },
        error: e => console.error(e),
        complete: () => console.info('Rol de usuario actualizado')
      });
    this.subscriptions.push(sub);
  }

  public borrar(usuario: Usuario): void {
    if (usuario.uid === this.as.usuario.uid) return;

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Estas a punto de eliminar a ${usuario.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const sub = this.us.eliminarUsuario(usuario.uid!)
          .subscribe({
            next: () => {
              this.cargarUsuarios();
              Swal.fire(
                '¡Eliminado!',
                `El usuario ${usuario.name} ha sido eliminado`,
                'success'
              );
            },
            error: e => console.error(e),
            complete: () => console.info('Operacion completada')
          });
        this.subscriptions.push(sub);
      }
    })
  }

  public abrirModal(usuario: Usuario): void {
    this.ims.abrirModal(usuario.uid!, 'usuarios', usuario.image);
  }

  public changeValue(value: number): void {
    this.from += value;
    if (this.from < 0)
      this.from = 0;
    else if (this.from > this.total)
      this.from -= value;

    this.cargarUsuarios();
  }

  public get usuarioActual(): Usuario {
    return this.as.usuario;
  }

}
